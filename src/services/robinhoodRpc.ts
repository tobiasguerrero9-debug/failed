export const ROBINHOOD_RPC_ENDPOINTS = [
  'https://rpc.mainnet.chain.robinhood.com',
  'https://rpc.testnet.chain.robinhood.com',
];

export const ERC20_SELECTORS = {
  name: '0x06fdde03',
  symbol: '0x95d89b3b',
  decimals: '0x313ce567',
  totalSupply: '0x18160ddd',
  balanceOf: '0x70a08231',
};

export const TRANSFER_EVENT_TOPIC = '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef';

export async function rpcCall<T = any>(method: string, params: any[], retries = 2): Promise<{ result: T | null; error?: string }> {
  let lastError = 'RPC_UNAVAILABLE';

  for (const endpoint of ROBINHOOD_RPC_ENDPOINTS) {
    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 6000);

        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            jsonrpc: '2.0',
            id: 1,
            method,
            params,
          }),
          signal: controller.signal,
        });
        clearTimeout(timeoutId);

        if (!res.ok) {
          lastError = `HTTP_${res.status}`;
          continue;
        }

        const data = await res.json();
        if (data.error) {
          return { result: null, error: data.error.message || 'RPC_EXECUTION_ERROR' };
        }
        return { result: data.result as T };
      } catch (err: any) {
        lastError = err?.name === 'AbortError' ? 'RPC_TIMEOUT' : 'NETWORK_ERROR';
      }
    }
  }

  return { result: null, error: lastError };
}

export function sanitizeAndValidateAddress(input: string): { address: string | null; error?: string } {
  if (!input) return { address: null, error: 'Invalid address' };

  // Sanitize: trim whitespace, linebreaks, surrounding quotes and punctuation
  let clean = input
    .trim()
    .replace(/^[\s,"':;.]+|[\s,"':;.]+$|\r?\n|\r/g, '')
    .replace(/['"]/g, '');

  if (!clean.startsWith('0x') && !clean.startsWith('0X')) {
    clean = '0x' + clean;
  }

  const hexPart = clean.slice(2).toLowerCase();

  // Non-hex character check
  if (!/^[a-f0-9]*$/.test(hexPart)) {
    return { address: null, error: 'Invalid address' };
  }

  // Exact 40 hex char check
  if (hexPart.length < 40) {
    return { address: null, error: 'Incomplete token address — please paste the full contract address.' };
  }

  if (hexPart.length > 40) {
    return { address: null, error: 'Invalid address' };
  }

  return { address: '0x' + hexPart };
}

export function decodeABIString(hex: string | null): string {
  if (!hex || hex === '0x' || hex.length < 130) return '';
  try {
    const length = parseInt(hex.slice(66, 130), 16);
    if (isNaN(length) || length <= 0 || length > 256) return '';
    const dataHex = hex.slice(130, 130 + length * 2);
    let str = '';
    for (let i = 0; i < dataHex.length; i += 2) {
      const code = parseInt(dataHex.substr(i, 2), 16);
      if (code >= 32 && code <= 126) str += String.fromCharCode(code);
    }
    return str.trim();
  } catch (e) {
    return '';
  }
}

export function decodeBytes32String(hex: string | null): string {
  if (!hex || hex === '0x' || hex.length < 66) return '';
  try {
    let str = '';
    for (let i = 2; i < 66; i += 2) {
      const code = parseInt(hex.substr(i, 2), 16);
      if (code >= 32 && code <= 126) str += String.fromCharCode(code);
    }
    return str.trim();
  } catch (e) {
    return '';
  }
}

export function decodeBigInt(hex: string | null): bigint {
  if (!hex || hex === '0x') return 0n;
  try {
    return BigInt(hex);
  } catch {
    return 0n;
  }
}
