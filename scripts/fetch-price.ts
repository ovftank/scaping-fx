import { prisma } from '@/lib/prisma';
import type { VangTodayResponse } from '@/types/price';
import axios from 'axios';

const API_URL = 'https://www.vang.today/api/prices?type=XAUUSD';

const getVietnamTime = (): string => {
    const now = new Date();
    const vietnamTime = new Date(now.getTime() + 7 * 60 * 60 * 1000);
    return vietnamTime.toISOString().replace('T', ' ').slice(0, 19);
};

const fetchPrice = async (): Promise<void> => {
    try {
        const response = await axios.get<VangTodayResponse>(API_URL, {
            timeout: 10000
        });

        if (!response.data.success || !response.data.buy) {
            console.error('Invalid response from API');
            return;
        }

        const data = response.data;

        const existingPrice = await prisma.price.findUnique({
            where: { timestamp: data.timestamp }
        });

        if (existingPrice) {
            console.log(`[${getVietnamTime()}] Timestamp ${data.timestamp} already exists, skipping...`);
            return;
        }

        await prisma.price.create({
            data: {
                timestamp: data.timestamp,
                time: data.time,
                date: data.date,
                type: data.type,
                name: data.name,
                buy: data.buy,
                sell: data.sell,
                change_buy: data.change_buy,
                change_sell: data.change_sell
            }
        });

        console.log(`[${getVietnamTime()}] Saved price: ${data.buy} (${data.time})`);
    } catch (error) {
        console.error('Failed to fetch price:', error);
    }
};

const start = async (): Promise<void> => {
    console.log('Starting price fetcher...');

    while (true) {
        await fetchPrice();

        await new Promise((resolve) => setTimeout(resolve, 60000));
    }
};

await start();
