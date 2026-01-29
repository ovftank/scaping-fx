import { verifyToken } from '@/lib/jwt';
import { prisma } from '@/lib/prisma';
import type { GenerateSignalInput, Recommendation, SignalOutput } from '@/types/recommendation';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// CONSTANTS - Có thể move to .env sau này
const THRESHOLDS = {
    STRONG_BUY: 5,
    MODERATE_BUY: 2,
    STRONG_SELL: -5,
    MODERATE_SELL: -2,
    PERCENT: 0.05
} as const;

const GET = async (request: Request): Promise<NextResponse<Recommendation | { error: string; message: string }>> => {
    try {
        // 1. Verify JWT token
        const authHeader = request.headers.get('authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json(
                {
                    error: 'Unauthorized',
                    message: 'Missing or invalid authorization header'
                },
                { status: 401 }
            );
        }

        const token = authHeader.substring(7);
        const payload = await verifyToken(token);

        if (!payload) {
            return NextResponse.json(
                {
                    error: 'Unauthorized',
                    message: 'Invalid or expired token'
                },
                { status: 401 }
            );
        }

        // 2. Fetch latest price
        const latestPrice = await prisma.price.findFirst({
            orderBy: {
                timestamp: 'desc'
            },
            where: {
                type: 'XAUUSD'
            }
        });

        if (!latestPrice) {
            return NextResponse.json(
                {
                    error: 'Unable to generate recommendation',
                    message: 'No price data available'
                },
                { status: 404 }
            );
        }

        // 3. Fetch previous price (để tính trend/momentum)
        const previousPrice = await prisma.price.findFirst({
            orderBy: {
                timestamp: 'desc'
            },
            where: {
                type: 'XAUUSD',
                timestamp: {
                    lt: latestPrice.timestamp
                }
            }
        });

        // 4. Calculate metrics
        const buyPrice = latestPrice.buy;
        const changeBuy = latestPrice.change_buy;
        const changePercent = previousPrice
            ? ((buyPrice - previousPrice.buy) / previousPrice.buy) * 100
            : 0;

        // 5. Generate signal
        const signal = generateSignal({
            buyPrice,
            changeBuy,
            changePercent,
            previousChangeBuy: previousPrice?.change_buy
        });

        // 6. Build response
        const recommendation: Recommendation = {
            ...signal,
            currentPrice: buyPrice,
            buyPrice,
            sellPrice: latestPrice.sell,
            changeBuy,
            changePercent,
            timestamp: latestPrice.timestamp,
            generatedAt: new Date().toISOString()
        };

        return NextResponse.json(recommendation);
    } catch (error) {
        console.error('Failed to generate recommendation:', error);

        return NextResponse.json(
            {
                error: 'Unable to generate recommendation',
                message: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
};

const generateSignal = (input: GenerateSignalInput): SignalOutput => {
    const { changeBuy, changePercent, previousChangeBuy } = input;

    // BUY SIGNAL
    if (
        changeBuy > THRESHOLDS.MODERATE_BUY &&
        changePercent > THRESHOLDS.PERCENT &&
        previousChangeBuy !== undefined &&
        previousChangeBuy !== null &&
        changeBuy > previousChangeBuy
    ) {
        if (changeBuy > THRESHOLDS.STRONG_BUY) {
            return {
                signal: 'BUY',
                confidence: 'STRONG',
                reasoning: `Giá vàng tăng mạnh ${changeBuy.toFixed(2)} (+${changePercent.toFixed(2)}%). Momentum dương rõ rệt, khuyến nghị BUY mạnh.`
            };
        }

        return {
            signal: 'BUY',
            confidence: 'MODERATE',
            reasoning: `Giá vàng tăng ${changeBuy.toFixed(2)} (+${changePercent.toFixed(2)}%). Xu hướng dương, khuyến nghị BUY.`
        };
    }

    // SELL SIGNAL
    if (
        changeBuy < THRESHOLDS.MODERATE_SELL &&
        changePercent < -THRESHOLDS.PERCENT &&
        previousChangeBuy !== undefined &&
        previousChangeBuy !== null &&
        changeBuy < previousChangeBuy
    ) {
        if (changeBuy < THRESHOLDS.STRONG_SELL) {
            return {
                signal: 'SELL',
                confidence: 'STRONG',
                reasoning: `Giá vàng giảm mạnh ${Math.abs(changeBuy).toFixed(2)} (${changePercent.toFixed(2)}%). Momentum âm rõ rệt, khuyến nghị SELL mạnh.`
            };
        }

        return {
            signal: 'SELL',
            confidence: 'MODERATE',
            reasoning: `Giá vàng giảm ${Math.abs(changeBuy).toFixed(2)} (${changePercent.toFixed(2)}%). Xu hướng âm, khuyến nghị SELL.`
        };
    }

    // HOLD SIGNAL (mặc định)
    return {
        signal: 'HOLD',
        confidence: 'WEAK',
        reasoning: `Thị trường đang sideway với thay đổi nhỏ ${changeBuy.toFixed(2)}. Không có tín hiệu rõ ràng, khuyến nghị HOLD.`
    };
};

export { GET };
