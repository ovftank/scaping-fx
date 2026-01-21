import { prisma } from '@/lib/prisma';
import type { PriceData } from '@/types/price';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const GET = async (): Promise<NextResponse<PriceData>> => {
    try {
        const latestPrice = await prisma.price.findFirst({
            orderBy: {
                timestamp: 'desc'
            },
            where: {
                type: 'XAUUSD'
            }
        });

        if (!latestPrice) {
            const fallbackData: PriceData = {
                symbol: 'XAU/USD',
                price: 0,
                change: 0,
                changePercent: 0,
                buy: 0,
                changeBuy: 0
            };

            return NextResponse.json(fallbackData);
        }

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

        const price = latestPrice.buy;
        const change = previousPrice ? price - previousPrice.buy : 0;
        const changePercent = price > 0 ? (change / price) * 100 : 0;

        const priceData: PriceData = {
            symbol: 'XAU/USD',
            price: Number.parseFloat(price.toFixed(2)),
            change: Number.parseFloat(change.toFixed(2)),
            changePercent: Number.parseFloat(changePercent.toFixed(2)),
            buy: latestPrice.buy,
            changeBuy: latestPrice.change_buy
        };

        return NextResponse.json(priceData);
    } catch (error) {
        console.error('Failed to fetch price from database:', error);

        const fallbackData: PriceData = {
            symbol: 'XAU/USD',
            price: 0,
            change: 0,
            changePercent: 0,
            buy: 0,
            changeBuy: 0
        };

        return NextResponse.json(fallbackData);
    }
};

export { GET };
