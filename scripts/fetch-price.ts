import { prisma } from '@/lib/prisma';
import axios from 'axios';

const API_URL = 'https://www.vang.today/api/prices?type=XAUUSD';

interface VangTodayResponse {
    success: boolean;
    timestamp: number;
    time: string;
    date: string;
    type: string;
    name: string;
    buy: number;
    sell: number;
    change_buy: number;
    change_sell: number;
}

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
            console.log(`[${new Date().toISOString()}] Timestamp ${data.timestamp} already exists, skipping...`);
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

        console.log(`[${new Date().toISOString()}] Saved price: ${data.buy} (${data.time})`);
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
