'use client';

import ChartIcon from '@/assets/svgs/chart-icon';
import type { PriceData } from '@/types/price';
import axios from 'axios';
import type { FC } from 'react';
import { useEffect, useState } from 'react';

const HeroSection: FC = () => {
    const [priceData, setPriceData] = useState<PriceData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPrice = async (): Promise<void> => {
            try {
                const { data } = await axios.get<PriceData>('/api/prices');
                setPriceData(data);
            } catch {
                //
            } finally {
                setIsLoading(false);
            }
        };

        void fetchPrice();

        const interval = setInterval(fetchPrice, 10000);

        return (): void => clearInterval(interval);
    }, []);

    return (
        <>
            <section className='relative overflow-hidden border-t border-white/5 py-24 sm:py-32'>
                <div className='bg-gradient-radial pointer-events-none absolute top-0 right-0 h-3/4 w-3/4 from-amber-500/10 to-transparent blur-[100px]' />

                <div className='relative z-10 mx-auto max-w-7xl px-6'>
                    <div className='grid items-center gap-12 sm:grid-cols-2 sm:gap-16'>
                        <div className='flex flex-col gap-8 text-center sm:text-left'>
                            <div className='flex flex-col items-center justify-center gap-4 sm:flex-row sm:justify-start'>
                                <div className='inline-flex w-fit items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1.5'>
                                    <span className='relative flex h-2 w-2'>
                                        <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-500 opacity-75' />
                                        <span className='relative inline-flex h-2 w-2 rounded-full bg-amber-500' />
                                    </span>
                                    <span className='text-xs font-semibold tracking-wider text-amber-500 uppercase'>Live • 24/7</span>
                                </div>

                                <div className='flex items-center gap-3 rounded-full border border-white/10 bg-[#111] px-4 py-1.5 shadow-[0_0_20px_rgba(245,159,10,0.1)] backdrop-blur-sm'>
                                    <span className='text-xs font-bold tracking-wider text-gray-400 uppercase'>{priceData?.symbol ?? 'XAU/USD'}</span>
                                    <span className='font-mono text-xl font-bold tracking-tight text-white'>{isLoading ? '…' : (priceData?.price.toFixed(2) ?? '0')}</span>
                                    {!isLoading && priceData ? (
                                        <span className={`text-xs font-bold ${priceData.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                            {priceData.change >= 0 ? '+' : ''}
                                            {priceData.change.toFixed(2)} ({priceData.changePercent >= 0 ? '+' : ''}
                                            {priceData.changePercent.toFixed(2)}%)
                                        </span>
                                    ) : null}
                                </div>
                            </div>

                            <div>
                                <p className='text-4xl leading-[1.15] font-black tracking-tighter text-white sm:text-5xl'>
                                    Tín Hiệu Trading <br />
                                    <span className='text-white'>Được Cung Cấp Bởi AI</span>
                                </p>
                            </div>
                            <p className='mx-auto max-w-xl text-lg leading-relaxed font-medium text-gray-400 sm:mx-0'>Nhận tín hiệu XAU/USD và Forex chính xác cao trong thời gian thực. Phân tích tự động 24/7, giúp bạn đưa ra quyết định giao dịch thông minh.</p>
                            <div className='mt-2 flex items-center justify-center gap-8 border-t border-white/10 pt-6 sm:justify-start'>
                                <div>
                                    <p className='text-3xl font-bold text-white'>90%+</p>
                                    <p className='text-xs tracking-wider text-gray-500 uppercase'>Độ chính xác</p>
                                </div>
                                <div>
                                    <p className='text-3xl font-bold text-white'>24/7</p>
                                    <p className='text-xs tracking-wider text-gray-500 uppercase'>Tín hiệu realtime</p>
                                </div>
                            </div>
                        </div>

                        <div className='perspective-1000 group relative'>
                            <div className='absolute -inset-10 rounded-full bg-amber-500/20 opacity-40 blur-[80px] transition-opacity duration-700' />

                            <div className='glass-panel relative transform overflow-hidden rounded-xl border border-white/10 p-2 shadow-2xl transition-all duration-700 hover:border-amber-500/30'>
                                <div className='pointer-events-none absolute inset-0 z-20 bg-[linear-gradient(0deg,transparent_24%,rgba(245,159,10,0.3)_25%,rgba(245,159,10,0.3)_26%,transparent_27%,transparent_74%,rgba(245,159,10,0.3)_75%,rgba(245,159,10,0.3)_76%,transparent_77%,transparent),linear-gradient(90deg,transparent_24%,rgba(245,159,10,0.3)_25%,rgba(245,159,10,0.3)_26%,transparent_27%,transparent_74%,rgba(245,159,10,0.3)_75%,rgba(245,159,10,0.3)_76%,transparent_77%,transparent)] bg-size-[60px_60px] opacity-20' />

                                <div className='relative aspect-4/3 w-full overflow-hidden rounded-lg bg-black/50 bg-cover bg-center' style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAUd-fPQkbqY-uJdaqLEGf3mcKfZH3rB2Wab-8_vR_Szs97jUyE1G4nhfgZoVZ83jS9ygmVnwyxiV2fQB9yHsvyUGzfQPrW5n612aTXjvZmpeBXk_xa9pnCmsyj-dr-8PQoe67G3pOBDYWDEPKCYHdJ5SCZ7Sp4VE0GQMS076dPcuyEGFghbV-O0hIlfIgb-pocWNBBj8ALSvvMkr3ZKBVkXpFOe0NyfsJlKo7piBxwwtx0nymXTOwZCEQbKBcgEEiBWtYJhMzSWVqT')" }}>
                                    <div className='absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent opacity-80' />

                                    <div className='absolute right-0 bottom-0 left-0 z-10 flex h-48 items-end'>
                                        <ChartIcon />
                                    </div>

                                    <div className='absolute right-6 bottom-6 left-6 z-20 flex items-end justify-between'>
                                        <div>
                                            <div className='mb-1 flex items-center gap-2 font-mono text-sm text-amber-500'>
                                                <span className='h-2 w-2 rounded-full bg-amber-500' /> {priceData?.symbol ?? 'XAU/USD'}
                                            </div>
                                            <div className='text-4xl font-bold tracking-tight text-white'>{isLoading ? '…' : (priceData?.price.toFixed(2) ?? '0')}</div>
                                        </div>
                                        {!isLoading && priceData ? (
                                            <div className='text-right'>
                                                <div className={`text-sm font-bold ${priceData.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                                    {priceData.change >= 0 ? '+' : ''}
                                                    {priceData.change.toFixed(2)}
                                                </div>
                                                <div className={`text-xs font-bold ${priceData.changePercent >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                                    {priceData.changePercent >= 0 ? '+' : ''}
                                                    {priceData.changePercent.toFixed(2)}%
                                                </div>
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                            </div>

                            <div className='glass-panel absolute top-20 -right-6 hidden rounded-lg border border-white/10 p-4 shadow-xl sm:block'>
                                <div className='flex items-center gap-3'>
                                    <div className='flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#1e1e1e]'>
                                        <span className='material-symbols-outlined text-xl text-amber-500'>check_circle</span>
                                    </div>
                                    <div>
                                        <p className='text-xs text-gray-400'>Hoạt động</p>
                                        <p className='text-sm font-bold text-white'>Tín hiệu realtime</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className='w-full overflow-hidden border-y border-white/10 bg-[#0a0a0a] py-3'>
                <div className='no-scrollbar mx-auto max-w-7xl overflow-x-auto px-6'>
                    <div className='flex min-w-max gap-8 sm:justify-around'>
                        <div className='flex items-center gap-3'>
                            <span className='font-mono text-sm font-bold text-amber-500'>Giá Mua</span>
                            <span className='text-sm font-bold text-white'>{isLoading ? '…' : (priceData?.buy.toFixed(2) ?? '0')}</span>
                            <span className={`rounded px-1.5 py-0.5 text-xs font-medium ${(priceData?.changeBuy ?? 0) >= 0 ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                                {(priceData?.changeBuy ?? 0) >= 0 ? '+' : ''}
                                {isLoading ? '…' : (priceData?.changeBuy.toFixed(2) ?? '0')}
                            </span>
                        </div>
                        <div className='h-4 w-px bg-white/10' />
                        <div className='flex items-center gap-3'>
                            <span className='font-mono text-sm text-gray-400'>Thay Đổi</span>
                            <span className='text-sm font-bold text-white'>{isLoading ? '…' : `${(priceData?.change ?? 0) >= 0 ? '+' : ''}${priceData?.change?.toFixed(2) ?? '0'}`}</span>
                        </div>
                        <div className='h-4 w-px bg-white/10' />
                        <div className='flex items-center gap-3'>
                            <span className='font-mono text-sm text-gray-400'>%</span>
                            <span className={`rounded px-1.5 py-0.5 text-xs font-medium ${(priceData?.changePercent ?? 0) >= 0 ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                                {(priceData?.changePercent ?? 0) >= 0 ? '+' : ''}
                                {isLoading ? '…' : `${priceData?.changePercent?.toFixed(2) ?? '0'}%`}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HeroSection;
