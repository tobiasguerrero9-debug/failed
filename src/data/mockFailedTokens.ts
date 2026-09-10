import type { SignalItem, FailedToken, FailureScoreDemo } from '../types';

export const HERO_SCORE_PREVIEW: FailureScoreDemo = {
  score: 82,
  maxScore: 100,
  verdict: "Probably Failed",
  riskLevel: "High risk",
  subtext: "HIGH RISK. PROCEED WITH CAUTION."
};

/**
 * 3 Core Failure Signals as specified in product mandate
 */
export const MOCK_SIGNALS: SignalItem[] = [
  {
    id: "liquidity",
    title: "Liquidity",
    status: "Weak",
    statusColor: "purple",
    value: "$12.4K",
    sparkline: [95, 80, 60, 45, 30, 20, 12.4],
    iconName: "droplet"
  },
  {
    id: "holder-concentration",
    title: "Holder Concentration",
    status: "High",
    statusColor: "green",
    value: "78% top 10",
    sparkline: [20, 35, 45, 55, 68, 75, 78],
    iconName: "users"
  },
  {
    id: "dev-wallet",
    title: "Dev Wallet",
    status: "Moving",
    statusColor: "purple",
    value: "Last active 2h ago",
    sparkline: [10, 40, 15, 60, 25, 80, 35],
    iconName: "wallet"
  }
];

/**
 * 3 Demo Rows for What Failed? table
 * Data structure designed to easily bind to real onchain API endpoints later
 */
export const MOCK_FAILED_TOKENS: FailedToken[] = [
  {
    id: "mooncat",
    rank: 1,
    name: "MOONCAT",
    symbol: "$MOONCAT",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=mooncat&backgroundColor=b6e3f4,c0aede,d1d4f9",
    chain: "SOL",
    chainColor: "#9945FF",
    failureScore: 94,
    timeToFail: "2h 14m",
    liquidity: "$4.1K",
    devStatus: "Dumped"
  },
  {
    id: "doge-ai",
    rank: 2,
    name: "DOGE AI",
    symbol: "$DOGEAI",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=dogeai&backgroundColor=ffd5dc,ffdfbf",
    chain: "BASE",
    chainColor: "#0052FF",
    failureScore: 89,
    timeToFail: "4h 37m",
    liquidity: "$8.9K",
    devStatus: "Inactive"
  },
  {
    id: "frogga",
    rank: 3,
    name: "FROGGA",
    symbol: "$FROGGA",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=frogga&backgroundColor=c0aede,d1d4f9",
    chain: "ETH",
    chainColor: "#627EEA",
    failureScore: 97,
    timeToFail: "3h 51m",
    liquidity: "$1.2K",
    devStatus: "Rugged"
  }
];
