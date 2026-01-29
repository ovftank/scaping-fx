'use client';

import { AreaSeries, ColorType, createChart, type IChartApi, type Time } from 'lightweight-charts';
import { useRouter } from 'next/navigation';
import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';

interface PriceData {
    time: number;
    value: number;
}

interface Recommendation {
    signal: string;
    confidence: string;
    currentPrice: number;
    buyPrice: number;
    sellPrice: number;
    changeBuy: number;
    changePercent: number;
    timestamp: number;
    generatedAt: string;
}

const ChartComponent: FC<{ data: PriceData[] }> = ({ data }) => {
    const chartContainerRef = useRef<HTMLDivElement>(null);
    const chartRef = useRef<IChartApi | null>(null);

    useEffect(() => {
        if (!chartContainerRef.current || data.length === 0) return;

        const chart = createChart(chartContainerRef.current, {
            layout: {
                background: { type: ColorType.Solid, color: 'transparent' },
                textColor: '#9ca3af'
            },
            grid: {
                vertLines: { color: '#27272a' },
                horzLines: { color: '#27272a' }
            },
            width: chartContainerRef.current.clientWidth,
            height: 400,
            timeScale: {
                timeVisible: true,
                secondsVisible: false
            }
        });

        const lineSeries = chart.addSeries(AreaSeries, {
            lineColor: '#f59e0b',
            topColor: 'rgba(245, 158, 11, 0.4)',
            bottomColor: 'rgba(245, 158, 11, 0.0)',
            lineWidth: 2
        });

        const UTC7_OFFSET = 7 * 60 * 60;
        lineSeries.setData(data.map((d) => ({ time: (d.time + UTC7_OFFSET) as Time, value: d.value })));

        chart.timeScale().fitContent();

        chartRef.current = chart;

        const handleResize = () => {
            if (chartContainerRef.current && chartRef.current) {
                chartRef.current.applyOptions({ width: chartContainerRef.current.clientWidth });
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            chart.remove();
        };
    }, [data]);

    return <div ref={chartContainerRef} className='h-100 w-full' />;
};

interface DashboardClientProps {
    recommendation: Recommendation;
    priceData: PriceData[];
}

const RefreshButton: FC<{ recommendation: Recommendation }> = ({ recommendation }) => {
    const router = useRouter();
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const stepRef = useRef<number>(0);

    const steps = [
        { icon: '✓', text: 'Kết nối API' },
        { icon: '2', text: 'Thu thập dữ liệu' },
        { icon: '3', text: 'Phân tích RSI & MACD' },
        { icon: '4', text: 'Đánh giá xu hướng' },
        { icon: '5', text: 'Tín hiệu giao dịch' }
    ];

    const stepMessages = ['Đang kết nối dữ liệu thị trường...', 'Đang thu thập dữ liệu OHLCV...', 'Đang phân tích chỉ báo kỹ thuật...', 'Đang đánh giá xu hướng...', 'Đang tổng hợp tín hiệu...'];

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isRefreshing) {
            stepRef.current = 0;
            setTimeout(() => setCurrentStep(0), 0);
            interval = setInterval(() => {
                stepRef.current = (stepRef.current + 1) % steps.length;
                setCurrentStep(stepRef.current);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isRefreshing, steps.length]);

    const handleRefresh = (): void => {
        setIsRefreshing(true);
        router.refresh();
        setTimeout(() => {
            setIsRefreshing(false);
            setCurrentStep(0);
            stepRef.current = 0;
        }, 5000);
    };

    return (
        <>
            {isRefreshing && (
                <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm'>
                    <div className='bg-grid-pattern absolute inset-0 animate-pulse opacity-20' />
                    <div className='absolute inset-0 overflow-hidden'>
                        <div className='animate-float absolute top-1/4 left-1/4 h-2 w-2 rounded-full bg-amber-500/60' />
                        <div className='animate-float-delayed absolute top-1/3 right-1/3 h-3 w-3 rounded-full bg-yellow-500/40' />
                        <div className='animate-float-delayed-more absolute bottom-1/4 left-1/3 h-2 w-2 rounded-full bg-amber-400/50' />
                        <div className='animate-float absolute top-1/2 right-1/4 h-1.5 w-1.5 rounded-full bg-yellow-400/60' />
                    </div>

                    <div className='relative flex w-full max-w-sm flex-col items-center gap-4'>
                        <div className='relative'>
                            <div className='absolute inset-0 animate-ping rounded-full bg-amber-500/20' />
                            <div className='animate-spin-slow relative h-20 w-20 rounded-full border-2 border-amber-500/20 border-t-amber-500' />
                            <div className='absolute inset-1 h-18 w-18 animate-spin rounded-full border-2 border-transparent border-t-yellow-400/50' style={{ animationDirection: 'reverse', animationDuration: '3s' }} />
                            <div className='absolute inset-0 flex items-center justify-center'>
                                <span className='material-symbols-outlined animate-pulse text-4xl text-amber-500'>show_chart</span>
                            </div>
                        </div>

                        <div className='text-center'>
                            <h2 className='animate-shimmer-text text-xl font-bold text-white sm:text-2xl'>Phân tích thị trường</h2>
                            <p className='mt-1 text-sm text-amber-400'>{stepMessages[currentStep]}</p>
                        </div>

                        <div className='h-1.5 w-full overflow-hidden rounded-full bg-white/10'>
                            <div className='h-full rounded-full bg-linear-to-r from-amber-500 via-yellow-400 to-amber-500 transition-all duration-500' style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }} />
                        </div>

                        <div className='w-full space-y-1.5'>
                            {steps.map((step, index) => (
                                <div key={step.text} className={`flex items-center gap-2 rounded p-1.5 transition-all duration-300 ${index <= currentStep ? (index === currentStep ? 'border border-amber-500/30 bg-amber-500/10' : 'bg-green-500/5') : 'bg-white/5 opacity-40'}`}>
                                    <span className={`flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold ${index < currentStep ? 'bg-green-500 text-black' : index === currentStep ? 'bg-amber-500 text-black' : 'bg-white/10 text-gray-400'}`}>{step.icon}</span>
                                    <span className={`flex-1 text-xs ${index < currentStep ? 'text-green-400' : index === currentStep ? 'font-medium text-white' : 'text-gray-400'}`}>{step.text}</span>
                                    {index < currentStep && <span className='material-symbols-outlined text-xs text-green-500'>check</span>}
                                    {index === currentStep && <span className='h-3 w-3 animate-spin rounded-full border-2 border-amber-500 border-t-transparent' />}
                                </div>
                            ))}
                        </div>

                        <div className='grid w-full grid-cols-2 gap-3 rounded-lg bg-white/5 p-3'>
                            <div className='flex flex-col items-center'>
                                <span className='text-[10px] text-gray-500'>Giá hiện tại</span>
                                <span className='text-lg font-bold text-white'>{recommendation.currentPrice.toLocaleString('vi-VN')}</span>
                            </div>
                            <div className='flex flex-col items-center'>
                                <span className='text-[10px] text-gray-500'>24h</span>
                                <span className={`text-lg font-bold ${recommendation.changePercent >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                    {recommendation.changePercent >= 0 ? '+' : ''}
                                    {recommendation.changePercent.toFixed(2)}%
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className='animate-pulse-slow pointer-events-none absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-amber-500/10 blur-[100px]' />
                    <div className='animate-pulse-slow-delayed pointer-events-none absolute right-1/4 bottom-1/4 h-64 w-64 rounded-full bg-yellow-500/10 blur-[100px]' />
                </div>
            )}

            <div className='relative my-4 sm:mt-6'>
                <div className={`absolute -inset-0.5 rounded-xl bg-conic from-amber-500 via-yellow-400 to-amber-500 opacity-75 blur-[2px] transition-opacity duration-500 ${isRefreshing ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'}`} />
                <button onClick={handleRefresh} disabled={isRefreshing} className='group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl border border-white/10 bg-[#111] px-8 py-4 text-lg font-bold text-white transition-all hover:border-amber-500/30 hover:bg-[#1a1a1a] disabled:opacity-70 sm:w-auto sm:px-10 sm:py-5 sm:text-xl'>
                    <span className='absolute inset-0 rounded-xl bg-linear-to-r from-transparent via-amber-500/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100' />
                    <span className='animate-shimmer absolute inset-0 -translate-x-full rounded-xl bg-linear-to-r from-transparent via-amber-400/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full' />
                    <span className='relative z-10 flex items-center gap-3'>
                        {isRefreshing ? (
                            <>
                                <span className='h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white' />
                                <span>Đang cập nhật...</span>
                            </>
                        ) : (
                            <>
                                <span className='material-symbols-outlined text-2xl'>refresh</span>
                                <span>Phân tích thị trường</span>
                            </>
                        )}
                    </span>
                </button>
            </div>
        </>
    );
};

const CountdownTimer: FC<{ timestamp: number }> = ({ timestamp }) => {
    const [timeLeft, setTimeLeft] = useState(18 * 60);

    useEffect(() => {
        const targetTime = timestamp * 1000 + 18 * 60 * 1000;

        const updateCountdown = () => {
            const now = Date.now();
            const remaining = Math.max(0, Math.floor((targetTime - now) / 1000));
            setTimeLeft(remaining);
        };

        updateCountdown();
        const interval = setInterval(updateCountdown, 1000);

        return () => clearInterval(interval);
    }, [timestamp]);

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return (
        <div className='flex items-center justify-center gap-1 text-sm font-medium text-amber-500'>
            <span className='material-symbols-outlined text-base'>timer</span>
            <span>
                {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
            </span>
        </div>
    );
};

const DashboardClient: FC<DashboardClientProps> = ({ recommendation, priceData }) => {
    return (
        <div className='relative overflow-hidden border-t border-white/5 bg-black'>
            <div className='pointer-events-none absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-amber-500/5 blur-[128px]' />
            <div className='relative z-10 mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-12'>
                <div className='mt-8 grid gap-6 lg:grid-cols-2'>
                    <div className='relative overflow-hidden rounded-2xl border border-white/10 bg-[#111]'>
                        <div className='relative p-4 sm:p-8 sm:py-10'>
                            <div className='mb-6 flex flex-col items-center gap-4 sm:mb-10 sm:gap-6'>
                                <div className='flex h-16 w-16 items-center justify-center rounded-full border border-amber-500/30 bg-amber-500/10'>
                                    <span className='material-symbols-outlined text-3xl text-amber-500'>show_chart</span>
                                </div>

                                <div className='text-center'>
                                    <div className='mb-2 flex items-center justify-center gap-2'>
                                        <span className='relative flex h-2 w-2'>
                                            <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-500 opacity-75' />
                                            <span className='relative inline-flex h-2 w-2 rounded-full bg-amber-500' />
                                        </span>
                                        <span className='text-[10px] font-semibold tracking-[0.2em] text-amber-500 uppercase sm:text-xs'>Tín hiệu</span>
                                    </div>
                                    <div className={`text-4xl font-black tracking-tighter uppercase sm:text-6xl ${recommendation.signal === 'BUY' ? 'text-green-500' : recommendation.signal === 'SELL' ? 'text-red-500' : 'text-amber-500'}`}>{recommendation.signal}</div>
                                </div>

                                <div className='flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 sm:rounded-xl sm:px-6 sm:py-3'>
                                    <span className='material-symbols-outlined text-sm text-amber-500'>verified</span>
                                    <span className='text-xs font-bold tracking-wider text-white uppercase sm:text-sm'>{recommendation.confidence === 'STRONG' ? 'Độ tin cậy: CAO' : recommendation.confidence === 'MODERATE' ? 'Độ tin cậy: TRUNG BÌNH' : 'Độ tin cậy: THẤP'}</span>
                                </div>
                            </div>

                            <div className='flex items-center justify-center gap-2 border-t border-white/10 pt-4 sm:gap-3 sm:pt-6'>
                                <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-white/5'>
                                    <span className='material-symbols-outlined text-sm text-gray-500'>update</span>
                                </div>
                                <span className='text-xs text-gray-500 sm:text-sm'>{new Date(recommendation.generatedAt).toLocaleString('vi-VN')}</span>
                            </div>

                            <div className='flex items-center justify-center'>
                                <RefreshButton recommendation={recommendation} />
                            </div>
                            <CountdownTimer timestamp={recommendation.timestamp} />
                        </div>
                    </div>

                    <div className='relative overflow-hidden rounded-2xl border border-white/10 bg-[#111] p-4 sm:p-8'>
                        <div className='mb-4 flex items-center justify-between'>
                            <div className='flex items-center gap-2'>
                                <span className='material-symbols-outlined text-xl text-amber-500'>area_chart</span>
                                <div className='text-xl font-bold text-white'>Biểu đồ giá XAUUSD</div>
                            </div>
                            <span className='rounded-full bg-amber-500/10 px-2 py-1 text-xs text-amber-500'>Live</span>
                        </div>
                        {priceData.length > 0 ? <ChartComponent data={priceData} /> : <div className='flex h-100 items-center justify-center text-gray-400'>Không có dữ liệu</div>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardClient;
