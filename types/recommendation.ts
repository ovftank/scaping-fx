type SignalType = 'BUY' | 'SELL' | 'HOLD';

type ConfidenceLevel = 'STRONG' | 'MODERATE' | 'WEAK';

interface Recommendation {
    signal: SignalType;
    confidence: ConfidenceLevel;
    currentPrice: number;
    targetPrice?: number;
    stopLoss?: number;
    buyPrice: number;
    sellPrice: number;
    changeBuy: number;
    changePercent: number;
    timestamp: number;
    generatedAt: string;
}

interface GenerateSignalInput {
    buyPrice: number;
    changeBuy: number;
    changePercent: number;
    previousChangeBuy?: number | null;
}

interface SignalOutput {
    signal: 'BUY' | 'SELL' | 'HOLD';
    confidence: 'STRONG' | 'MODERATE' | 'WEAK';
}

export type { ConfidenceLevel, GenerateSignalInput, Recommendation, SignalOutput, SignalType };
