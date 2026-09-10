export interface SignalItem {
  id: string;
  title: string;
  status: 'Weak' | 'High' | 'Moving' | 'Medium' | 'Critical';
  statusColor: 'purple' | 'green' | 'red' | 'amber';
  value: string;
  sparkline: number[]; // Sparkline data points
  iconName: 'droplet' | 'users' | 'wallet';
  delay?: number;
}

export interface FailedToken {
  id: string;
  rank: number;
  name: string;
  symbol: string;
  avatar: string;
  chain: 'SOL' | 'BASE' | 'ETH';
  chainColor: string;
  failureScore: number;
  timeToFail: string;
  liquidity?: string;
  devStatus?: string;
}

export interface FailureScoreDemo {
  score: number;
  maxScore: number;
  verdict: string;
  riskLevel: string;
  subtext: string;
}
