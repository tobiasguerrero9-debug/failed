export type RiskLabel = 'Low Risk' | 'Elevated' | 'High Risk' | 'Probably Failed' | 'Unavailable';
export type ConfidenceLevel = 'High' | 'Medium' | 'Low';

export interface MetricItem {
  value: string;
  riskLabel: RiskLabel;
  score: number | null; // 0-100 or null if Unavailable
  available: boolean;
  detail?: string;
}

export interface Diagnostics {
  CHAIN_ID: number;
  BYTECODE_LENGTH: number;
  CONTRACT_CODE_FOUND: boolean;
  NAME_CALL: string | null;
  SYMBOL_CALL: string | null;
  DECIMALS_CALL: number | null;
  SUPPLY_CALL: string | null;
  TRANSFER_LOGS: number;
  DEPLOYER_FOUND: string | null;
  PROXY_DETECTED: boolean;
  LIQUIDITY_SOURCE: string;
  HOLDER_DATA_SOURCE: string;
  VOLUME_SOURCE: string;
  FAILED_STAGE: string;
}

export interface ScanResult {
  tokenName: string;
  tokenSymbol: string;
  contractAddress: string;
  totalSupply: string;
  decimals: number;
  detectedChain: string; // 'Robinhood Chain'
  liquidity: MetricItem;
  holderConcentration: MetricItem;
  devWalletActivity: MetricItem;
  volumeBehavior: MetricItem;
  failureScore: number; // 0 to 100
  riskStatus: RiskLabel;
  confidence: ConfidenceLevel;
  diagnostics: Diagnostics;
}

export interface ScanState {
  loading: boolean;
  error: string | null;
  result: ScanResult | null;
}
