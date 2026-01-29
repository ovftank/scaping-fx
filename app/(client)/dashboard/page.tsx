import { prisma } from '@/lib/prisma';
import type { FC } from 'react';
import DashboardClient from './dashboard-client';

const THRESHOLDS = {
    STRONG_BUY: 5,
    MODERATE_BUY: 2,
    STRONG_SELL: -5,
    MODERATE_SELL: -2,
    PERCENT: 0.05
} as const;

const generateSignal = (changeBuy: number, changePercent: number, previousChangeBuy: number | null) => {
    if (changeBuy > THRESHOLDS.MODERATE_BUY && changePercent > THRESHOLDS.PERCENT && previousChangeBuy !== undefined && previousChangeBuy !== null && changeBuy > previousChangeBuy) {
        if (changeBuy > THRESHOLDS.STRONG_BUY) {
            return { signal: 'BUY', confidence: 'STRONG' };
        }
        return { signal: 'BUY', confidence: 'MODERATE' };
    }

    if (changeBuy < THRESHOLDS.MODERATE_SELL && changePercent < -THRESHOLDS.PERCENT && previousChangeBuy !== undefined && previousChangeBuy !== null && changeBuy < previousChangeBuy) {
        if (changeBuy < THRESHOLDS.STRONG_SELL) {
            return { signal: 'SELL', confidence: 'STRONG' };
        }
        return { signal: 'SELL', confidence: 'MODERATE' };
    }

    return { signal: 'HOLD', confidence: 'WEAK' };
};

const DashboardPage: FC = async () => {
    try {
        const latestPrice = await prisma.price.findFirst({
            orderBy: { timestamp: 'desc' },
            where: { type: 'XAUUSD' }
        });

        if (!latestPrice) {
            return (
                <div className='relative overflow-hidden border-t border-white/5 bg-black'>
                    <div className='pointer-events-none absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-amber-500/5 blur-[128px]' />
                    <div className='relative z-10 mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-12'>
                        <div className='flex items-center justify-center'>
                            <span className='material-symbols-outlined animate-spin text-4xl text-amber-500'>sync</span>
                        </div>
                    </div>
                </div>
            );
        }

        const previousPrice = await prisma.price.findFirst({
            orderBy: { timestamp: 'desc' },
            where: {
                type: 'XAUUSD',
                timestamp: { lt: latestPrice.timestamp }
            }
        });

        const priceHistory = await prisma.price.findMany({
            orderBy: { timestamp: 'asc' },
            where: { type: 'XAUUSD' },
            take: 100
        });

        const buyPrice = latestPrice.buy;
        const changeBuy = latestPrice.change_buy;
        const changePercent = previousPrice ? ((buyPrice - previousPrice.buy) / previousPrice.buy) * 100 : 0;

        const signal = generateSignal(changeBuy, changePercent, previousPrice?.change_buy ?? null);

        const recommendation = {
            ...signal,
            currentPrice: buyPrice,
            buyPrice,
            sellPrice: latestPrice.sell,
            changeBuy,
            changePercent,
            timestamp: latestPrice.timestamp,
            generatedAt: new Date().toISOString()
        };

        const priceData = priceHistory.map((p) => ({
            time: p.timestamp,
            value: p.buy
        }));

        return <DashboardClient recommendation={recommendation} priceData={priceData} />;
    } catch {
        return (
            <div className='relative overflow-hidden border-t border-white/5 bg-black'>
                <div className='pointer-events-none absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-amber-500/5 blur-[128px]' />
                <div className='relative z-10 mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-12'>
                    <div className='flex items-center justify-center'>
                        <span className='material-symbols-outlined animate-spin text-4xl text-amber-500'>sync</span>
                    </div>
                </div>
            </div>
        );
    }
};

export default DashboardPage;
