import {
  rpcCall,
  sanitizeAndValidateAddress,
  ERC20_SELECTORS,
  TRANSFER_EVENT_TOPIC,
  decodeABIString,
  decodeBytes32String,
  decodeBigInt,
} from './robinhoodRpc';
import { ScanResult, MetricItem, Diagnostics } from '../types/scanner';
import { calculateFailureScore } from './riskScore';

export async function scanToken(tokenAddressInput: string): Promise<ScanResult> {
  const INPUT_ADDRESS = tokenAddressInput;

  // STEP 1: Address Sanitization & Validation (Strict 40 hex chars, NO silent padding)
  const { address: cleanAddress, error: addressErr } = sanitizeAndValidateAddress(INPUT_ADDRESS);
  if (!cleanAddress || addressErr) {
    throw new Error(addressErr || 'Invalid address');
  }

  const NORMALIZED_ADDRESS = cleanAddress;
  const RPC_ADDRESS = NORMALIZED_ADDRESS;

  console.log(`[SCANNER LOG] INPUT_ADDRESS: ${INPUT_ADDRESS}`);
  console.log(`[SCANNER LOG] NORMALIZED_ADDRESS: ${NORMALIZED_ADDRESS}`);
  console.log(`[SCANNER LOG] RPC_ADDRESS: ${RPC_ADDRESS}`);

  const diagnostics: Diagnostics = {
    CHAIN_ID: 4663,
    BYTECODE_LENGTH: 0,
    CONTRACT_CODE_FOUND: false,
    NAME_CALL: null,
    SYMBOL_CALL: null,
    DECIMALS_CALL: null,
    SUPPLY_CALL: null,
    TRANSFER_LOGS: 0,
    DEPLOYER_FOUND: null,
    PROXY_DETECTED: false,
    LIQUIDITY_SOURCE: 'None',
    HOLDER_DATA_SOURCE: 'None',
    VOLUME_SOURCE: 'None',
    FAILED_STAGE: 'NONE',
  };

  // STEP 2: Contract Existence Check (eth_getCode)
  const codeRpc = await rpcCall<string>('eth_getCode', [RPC_ADDRESS, 'latest']);
  if (codeRpc.error && !codeRpc.result) {
    diagnostics.FAILED_STAGE = 'RPC_UNAVAILABLE';
    throw new Error('Robinhood Chain RPC unavailable — retry');
  }

  const bytecode = codeRpc.result;
  if (!bytecode || bytecode === '0x' || bytecode === '0x0') {
    diagnostics.FAILED_STAGE = 'NO_CONTRACT_FOUND';
    throw new Error('No contract found at this address on Robinhood Chain. Check the contract address or chain.');
  }

  diagnostics.CONTRACT_CODE_FOUND = true;
  diagnostics.BYTECODE_LENGTH = bytecode.length;

  if (bytecode.includes('363d3d373d3d3d363d73') || bytecode.includes('7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc')) {
    diagnostics.PROXY_DETECTED = true;
  }

  // STEP 3: Defensive ERC-20 Metadata Extraction per target token
  let nameHex: string | null = null;
  let symbolHex: string | null = null;
  let decimalsHex: string | null = null;
  let totalSupplyHex: string | null = null;

  try { const r = await rpcCall<string>('eth_call', [{ to: RPC_ADDRESS, data: ERC20_SELECTORS.name }, 'latest']); nameHex = r.result; } catch {}
  try { const r = await rpcCall<string>('eth_call', [{ to: RPC_ADDRESS, data: ERC20_SELECTORS.symbol }, 'latest']); symbolHex = r.result; } catch {}
  try { const r = await rpcCall<string>('eth_call', [{ to: RPC_ADDRESS, data: ERC20_SELECTORS.decimals }, 'latest']); decimalsHex = r.result; } catch {}
  try { const r = await rpcCall<string>('eth_call', [{ to: RPC_ADDRESS, data: ERC20_SELECTORS.totalSupply }, 'latest']); totalSupplyHex = r.result; } catch {}

  let tokenName = decodeABIString(nameHex) || decodeBytes32String(nameHex);
  let tokenSymbol = decodeABIString(symbolHex) || decodeBytes32String(symbolHex);

  diagnostics.NAME_CALL = tokenName || null;
  diagnostics.SYMBOL_CALL = tokenSymbol || null;
  diagnostics.DECIMALS_CALL = decimalsHex && decimalsHex !== '0x' ? parseInt(decimalsHex, 16) : null;
  diagnostics.SUPPLY_CALL = totalSupplyHex && totalSupplyHex !== '0x' ? decodeBigInt(totalSupplyHex).toString() : null;

  // STEP 4: Token-Specific Transfer Event Logs
  const VOLUME_ADDRESS = RPC_ADDRESS;
  console.log(`[SCANNER LOG] VOLUME_ADDRESS: ${VOLUME_ADDRESS}`);

  const latestBlockRpc = await rpcCall<string>('eth_blockNumber', []);
  const latestBlock = latestBlockRpc.result ? parseInt(latestBlockRpc.result, 16) : 0;
  const fromBlockHex = '0x' + Math.max(0, latestBlock - 50000).toString(16);

  let logs: any[] | null = null;
  try {
    const logsRpc = await rpcCall<any[]>('eth_getLogs', [{
      fromBlock: fromBlockHex,
      toBlock: 'latest',
      address: VOLUME_ADDRESS,
      topics: [TRANSFER_EVENT_TOPIC],
    }]);
    logs = logsRpc.result;
  } catch {}

  diagnostics.TRANSFER_LOGS = logs ? logs.length : 0;

  if (!tokenName && !tokenSymbol && !decimalsHex && !totalSupplyHex && diagnostics.TRANSFER_LOGS === 0) {
    diagnostics.FAILED_STAGE = 'NOT_TOKEN_COMPATIBLE';
    throw new Error('No contract found at this address on Robinhood Chain. Check the contract address or chain.');
  }

  if (!tokenName) tokenName = `Token ${RPC_ADDRESS.slice(0, 6)}...${RPC_ADDRESS.slice(-4)}`;
  if (!tokenSymbol) tokenSymbol = 'TOKEN';

  const decimals = diagnostics.DECIMALS_CALL !== null ? diagnostics.DECIMALS_CALL : 18;
  const totalSupplyBigInt = decodeBigInt(totalSupplyHex);
  const totalSupplyFormatted = totalSupplyBigInt > 0n
    ? (Number(totalSupplyBigInt / 10n ** BigInt(Math.max(0, decimals - 2))) / 100).toLocaleString()
    : 'Unknown';

  // STEP 5: Token-Specific Deployer Identification
  const DEV_ADDRESS = RPC_ADDRESS;
  console.log(`[SCANNER LOG] DEV_ADDRESS: ${DEV_ADDRESS}`);
  let deployerAddress: string | null = null;
  try {
    const mintLogsRpc = await rpcCall<any[]>('eth_getLogs', [{
      fromBlock: '0x0',
      toBlock: 'latest',
      address: DEV_ADDRESS,
      topics: [TRANSFER_EVENT_TOPIC, '0x0000000000000000000000000000000000000000000000000000000000000000'],
    }]);
    const mintLogs = mintLogsRpc.result;
    if (mintLogs && mintLogs.length > 0 && mintLogs[0].topics && mintLogs[0].topics.length >= 3) {
      deployerAddress = '0x' + mintLogs[0].topics[2].slice(26).toLowerCase();
      diagnostics.DEPLOYER_FOUND = deployerAddress;
    }
  } catch {}

  // STEP 6: Quote-side liquidity (Frozen / Disabled for V1 Launch)
  const LIQUIDITY_ADDRESS = RPC_ADDRESS;
  console.log(`[SCANNER LOG] LIQUIDITY_ADDRESS: ${LIQUIDITY_ADDRESS}`);
  diagnostics.LIQUIDITY_SOURCE = 'Frozen for V1 Launch';

  const liquidityMetric: MetricItem = {
    value: 'Unavailable',
    riskLabel: 'Unavailable',
    score: null,
    available: false,
    detail: 'Liquidity module coming next',
  };

  // STEP 7: Metric 2 - Token-Specific Holder Concentration via balanceOf(addr)
  const HOLDER_ADDRESS = RPC_ADDRESS;
  console.log(`[SCANNER LOG] HOLDER_ADDRESS: ${HOLDER_ADDRESS}`);
  let holderMetric: MetricItem;
  try {
    const participants = new Set<string>();
    if (deployerAddress) participants.add(deployerAddress);

    if (logs) {
      for (const log of logs) {
        if (log.topics && log.topics.length >= 3) {
          const from = '0x' + log.topics[1].slice(26).toLowerCase();
          const to = '0x' + log.topics[2].slice(26).toLowerCase();
          if (from !== '0x0000000000000000000000000000000000000000') participants.add(from);
          if (to !== '0x0000000000000000000000000000000000000000') participants.add(to);
        }
      }
    }

    const addrsArray = Array.from(participants).filter(
      a => a !== '0x0000000000000000000000000000000000000000' && a !== '0x000000000000000000000000000000000000dead'
    );

    const holderBalances: { address: string; balance: bigint }[] = [];
    const chunkSize = 20;

    for (let i = 0; i < addrsArray.length; i += chunkSize) {
      const chunk = addrsArray.slice(i, i + chunkSize);
      const promises = chunk.map(async (addr) => {
        try {
          const data = '0x70a08231' + addr.slice(2).padStart(64, '0');
          const balRpc = await rpcCall<string>('eth_call', [{ to: HOLDER_ADDRESS, data }, 'latest']);
          const bal = decodeBigInt(balRpc.result);
          return { address: addr, balance: bal };
        } catch {
          return { address: addr, balance: 0n };
        }
      });
      const results = await Promise.all(promises);
      results.forEach(r => {
        if (r.balance > 0n) holderBalances.push(r);
      });
    }

    holderBalances.sort((a, b) => (b.balance > a.balance ? 1 : b.balance < a.balance ? -1 : 0));

    let top10Pct = 0;
    if (totalSupplyBigInt > 0n && holderBalances.length > 0) {
      const top10Sum = holderBalances.slice(0, 10).reduce((acc, h) => acc + h.balance, 0n);
      top10Pct = Number((top10Sum * 10000n) / totalSupplyBigInt) / 100;
    }

    diagnostics.HOLDER_DATA_SOURCE = `EVM balanceOf (${holderBalances.length} active holders)`;

    const holderScore = Math.min(100, Math.round(top10Pct));

    if (holderBalances.length === 0) {
      holderMetric = {
        value: 'Unavailable',
        riskLabel: 'Unavailable',
        score: null,
        available: false,
        detail: 'No holder state found in scanned logs',
      };
    } else if (top10Pct > 70) {
      holderMetric = {
        value: `Top 10 hold ${top10Pct.toFixed(1)}%`,
        riskLabel: 'High Risk',
        score: holderScore,
        available: true,
        detail: 'Extreme concentration in top wallets',
      };
    } else if (top10Pct > 40) {
      holderMetric = {
        value: `Top 10 hold ${top10Pct.toFixed(1)}%`,
        riskLabel: 'Elevated',
        score: holderScore,
        available: true,
        detail: 'Moderate holder concentration',
      };
    } else {
      holderMetric = {
        value: `Top 10 hold ${top10Pct.toFixed(1)}%`,
        riskLabel: 'Low Risk',
        score: holderScore,
        available: true,
        detail: 'Well distributed holder base',
      };
    }
  } catch {
    diagnostics.HOLDER_DATA_SOURCE = 'Error';
    holderMetric = {
      value: 'Unavailable',
      riskLabel: 'Unavailable',
      score: null,
      available: false,
    };
  }

  // STEP 8: Metric 3 - Token-Specific Dev Wallet Activity
  let devMetric: MetricItem;
  try {
    if (!deployerAddress) {
      devMetric = {
        value: 'Unavailable',
        riskLabel: 'Unavailable',
        score: null,
        available: false,
        detail: 'Deployer untracked in creation logs',
      };
    } else {
      const devBalRpc = await rpcCall<string>('eth_call', [{ to: DEV_ADDRESS, data: '0x70a08231' + deployerAddress.slice(2).padStart(64, '0') }, 'latest']);
      const devBal = decodeBigInt(devBalRpc.result);
      const devShare = totalSupplyBigInt > 0n ? Number((devBal * 10000n) / totalSupplyBigInt) / 100 : 0;
      const devScore = Math.min(100, Math.round(devShare));

      if (devShare > 20) {
        devMetric = {
          value: `Holds ${devShare.toFixed(1)}% supply`,
          riskLabel: 'High Risk',
          score: devScore,
          available: true,
          detail: 'Dev holds large portion of total supply',
        };
      } else if (devShare === 0) {
        devMetric = {
          value: 'Deployer transferred tokens',
          riskLabel: 'Low Risk',
          score: 0,
          available: true,
          detail: `Deployer: ${deployerAddress.slice(0, 6)}...${deployerAddress.slice(-4)}`,
        };
      } else {
        devMetric = {
          value: `Holds ${devShare.toFixed(1)}% supply`,
          riskLabel: 'Elevated',
          score: devScore,
          available: true,
          detail: `Deployer: ${deployerAddress.slice(0, 6)}...${deployerAddress.slice(-4)}`,
        };
      }
    }
  } catch {
    devMetric = {
      value: 'Unavailable',
      riskLabel: 'Unavailable',
      score: null,
      available: false,
    };
  }

  // STEP 9: Metric 4 - Token-Specific Volume Behavior (Activity Metric, Kept Separate)
  let volumeMetric: MetricItem;
  try {
    const logCount = logs ? logs.length : 0;
    diagnostics.VOLUME_SOURCE = `${logCount} Transfer logs in 50k blocks`;
    const volScore = Math.max(0, Math.min(100, Math.round(100 - logCount * 0.5)));

    if (logCount > 100) {
      volumeMetric = {
        value: `${logCount} txs`,
        riskLabel: 'Low Risk',
        score: volScore,
        available: true,
        detail: 'Consistent trade frequency',
      };
    } else if (logCount > 5) {
      volumeMetric = {
        value: `${logCount} txs`,
        riskLabel: 'Elevated',
        score: volScore,
        available: true,
        detail: 'Low trade frequency',
      };
    } else if (logCount > 0) {
      volumeMetric = {
        value: `${logCount} tx`,
        riskLabel: 'High Risk',
        score: volScore,
        available: true,
        detail: 'Single or dead volume activity',
      };
    } else {
      volumeMetric = {
        value: 'Unavailable',
        riskLabel: 'Unavailable',
        score: null,
        available: false,
        detail: 'Zero transfer activity recorded',
      };
    }
  } catch {
    diagnostics.VOLUME_SOURCE = 'Error';
    volumeMetric = {
      value: 'Unavailable',
      riskLabel: 'Unavailable',
      score: null,
      available: false,
    };
  }

  // STEP 10: Dynamic Failure Score Calculation & Address Final Log
  const { failureScore, riskStatus, confidence } = calculateFailureScore({
    liquidity: liquidityMetric,
    holderConcentration: holderMetric,
    devWalletActivity: devMetric,
    volumeBehavior: volumeMetric,
  });

  const FINAL_RESULT_ADDRESS = RPC_ADDRESS;
  console.log(`[SCANNER LOG] FINAL_RESULT_ADDRESS: ${FINAL_RESULT_ADDRESS} | Score: ${failureScore}`);

  return {
    tokenName,
    tokenSymbol,
    contractAddress: FINAL_RESULT_ADDRESS,
    totalSupply: totalSupplyFormatted,
    decimals,
    detectedChain: 'Robinhood Chain',
    liquidity: liquidityMetric,
    holderConcentration: holderMetric,
    devWalletActivity: devMetric,
    volumeBehavior: volumeMetric,
    failureScore,
    riskStatus,
    confidence,
    diagnostics,
  };
}
