import { MetricItem, RiskLabel, ConfidenceLevel } from '../types/scanner';

export interface ScoreCalculationResult {
  failureScore: number;
  riskStatus: RiskLabel;
  confidence: ConfidenceLevel;
  components: {
    liquidityScore: number | null;
    holderScore: number | null;
    devScore: number | null;
    volumeScore: number | null;
    weightedTotal: number;
    availableCount: number;
  };
}

export function calculateFailureScore(metrics: {
  liquidity: MetricItem;
  holderConcentration: MetricItem;
  devWalletActivity: MetricItem;
  volumeBehavior: MetricItem;
}): ScoreCalculationResult {
  // V1 LAUNCH: Liquidity is frozen (Unavailable). Score uses 3 metrics re-normalized.
  const BASE_WEIGHTS = {
    holderConcentration: 0.45,
    devWalletActivity: 0.35,
    volumeBehavior: 0.20,
  };

  const availableMetrics: { key: keyof typeof BASE_WEIGHTS; score: number; weight: number }[] = [];

  if (metrics.holderConcentration.available && metrics.holderConcentration.score !== null) {
    availableMetrics.push({ key: 'holderConcentration', score: metrics.holderConcentration.score, weight: BASE_WEIGHTS.holderConcentration });
  }
  if (metrics.devWalletActivity.available && metrics.devWalletActivity.score !== null) {
    availableMetrics.push({ key: 'devWalletActivity', score: metrics.devWalletActivity.score, weight: BASE_WEIGHTS.devWalletActivity });
  }
  if (metrics.volumeBehavior.available && metrics.volumeBehavior.score !== null) {
    availableMetrics.push({ key: 'volumeBehavior', score: metrics.volumeBehavior.score, weight: BASE_WEIGHTS.volumeBehavior });
  }

  const availableCount = availableMetrics.length;

  let failureScore = 50;
  let weightedTotal = 50;

  if (availableCount > 0) {
    const totalWeight = availableMetrics.reduce((sum, m) => sum + m.weight, 0);
    weightedTotal = availableMetrics.reduce((sum, m) => sum + m.score * (m.weight / totalWeight), 0);
    failureScore = Math.min(100, Math.max(0, Math.round(weightedTotal)));
  }

  let riskStatus: RiskLabel = 'Low Risk';
  if (failureScore > 80) {
    riskStatus = 'Probably Failed';
  } else if (failureScore > 55) {
    riskStatus = 'High Risk';
  } else if (failureScore > 25) {
    riskStatus = 'Elevated';
  } else {
    riskStatus = 'Low Risk';
  }

  let confidence: ConfidenceLevel = 'Low';
  if (availableCount >= 3) {
    confidence = 'High';
  } else if (availableCount === 2) {
    confidence = 'Medium';
  } else {
    confidence = 'Low';
  }

  return {
    failureScore,
    riskStatus,
    confidence,
    components: {
      liquidityScore: null,
      holderScore: metrics.holderConcentration.available ? metrics.holderConcentration.score : null,
      devScore: metrics.devWalletActivity.available ? metrics.devWalletActivity.score : null,
      volumeScore: metrics.volumeBehavior.available ? metrics.volumeBehavior.score : null,
      weightedTotal: Math.round(weightedTotal * 100) / 100,
      availableCount,
    },
  };
}
