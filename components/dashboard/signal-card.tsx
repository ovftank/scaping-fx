'use client';

import type { Recommendation } from '@/types';
import type { FC } from 'react';

interface SignalCardProps {
    recommendation: Recommendation;
}

const SignalCard: FC<SignalCardProps> = ({ recommendation }) => {
    const getSignalInfo = () => {
        if (recommendation.signal === 'BUY') {
            return {
                color: 'green',
                bgGradient: 'from-green-500/20 via-green-500/10 to-transparent',
                borderColor: 'green-500/50',
                textColor: 'text-green-500',
                icon: 'trending_up',
                label: 'BUY',
                shadowColor: 'rgba(34, 197, 94, 0.3)'
            };
        }
        if (recommendation.signal === 'SELL') {
            return {
                color: 'red',
                bgGradient: 'from-red-500/20 via-red-500/10 to-transparent',
                borderColor: 'red-500/50',
                textColor: 'text-red-500',
                icon: 'trending_down',
                label: 'SELL',
                shadowColor: 'rgba(239, 68, 68, 0.3)'
            };
        }
        return {
            color: 'yellow',
            bgGradient: 'from-yellow-500/20 via-yellow-500/10 to-transparent',
            borderColor: 'yellow-500/50',
            textColor: 'text-yellow-500',
            icon: 'remove',
            label: 'HOLD',
            shadowColor: 'rgba(234, 179, 8, 0.3)'
        };
    };

    const signalInfo = getSignalInfo();

    return (
        <div className='relative overflow-hidden rounded-2xl border border-white/10 bg-[#111] shadow-2xl'>
            {/* Animated Gradient Background */}
            <div className={`pointer-events-none absolute inset-0 bg-linear-to-br ${signalInfo.bgGradient} opacity-50`} />

            {/* Glow Effect */}
            <div className={`pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full blur-[100px] opacity-30`} style={{ backgroundColor: signalInfo.shadowColor }} />

            <div className='relative p-4 sm:p-8 sm:py-10'>
                {/* Signal Header - Hero Style */}
                <div className='mb-6 flex flex-col items-center gap-4 sm:mb-10 sm:gap-6'>
                    {/* Icon Badge with Animation */}
                    <div className={`relative flex h-20 w-20 items-center justify-center rounded-full border-2 ${signalInfo.borderColor} bg-black/40 shadow-[0_0_40px_${signalInfo.shadowColor}] sm:h-28 sm:w-28`}>
                        <div className={`absolute inset-0 rounded-full bg-linear-to-br ${signalInfo.bgGradient} animate-pulse opacity-30`} />
                        <span className={`material-symbols-outlined text-4xl ${signalInfo.textColor} relative z-10 sm:text-6xl`}>
                            {signalInfo.icon}
                        </span>
                    </div>

                    {/* Signal Label */}
                    <div className='text-center'>
                        <div className='mb-2 flex items-center justify-center gap-2'>
                            <span className={`relative flex h-2 w-2`}>
                                <span className={`absolute inline-flex h-full w-full animate-ping rounded-full bg-${signalInfo.color}-500 opacity-75`} />
                                <span className={`relative inline-flex h-2 w-2 rounded-full bg-${signalInfo.color}-500`} />
                            </span>
                            <span className='text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400 sm:text-xs'>Tín hiệu</span>
                        </div>
                        <div className={`text-4xl font-black uppercase tracking-tighter ${signalInfo.textColor} drop-shadow-[0_0_30px_${signalInfo.shadowColor}] sm:text-6xl`}>
                            {signalInfo.label}
                        </div>
                    </div>

                    {/* Confidence Badge */}
                    <div
                        className={`rounded-lg px-4 py-2 text-xs font-bold uppercase tracking-wider shadow-lg sm:rounded-xl sm:px-6 sm:py-3 sm:text-sm ${
                            recommendation.confidence === 'STRONG'
                                ? 'bg-linear-to-r from-white to-white/80 text-black'
                                : recommendation.confidence === 'MODERATE'
                                    ? 'bg-linear-to-r from-white/70 to-white/50 text-black'
                                    : 'bg-linear-to-r from-white/40 to-white/20 text-gray-800'
                        }`}
                    >
                        {recommendation.confidence === 'STRONG' ? 'Độ tin cậy: CAO' : recommendation.confidence === 'MODERATE' ? 'Độ tin cậy: TRUNG BÌNH' : 'Độ tin cậy: THẤP'}
                    </div>
                </div>

                {/* Reasoning Box */}
                <div className='mb-6 rounded-xl border border-white/10 bg-black/40 p-4 backdrop-blur-sm sm:mb-10 sm:p-6'>
                    <div className='mb-3 flex items-center gap-2 sm:mb-4 sm:gap-3'>
                        <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 sm:h-10 sm:w-10'>
                            <span className='material-symbols-outlined text-amber-500'>lightbulb</span>
                        </div>
                        <span className='text-xs font-bold uppercase tracking-wider text-gray-400 sm:text-sm'>Phân tích</span>
                    </div>
                    <p className='text-base leading-relaxed text-white sm:text-lg'>{recommendation.reasoning}</p>
                </div>

                {/* Price Stats - Modern Grid */}
                <div className='mb-6 grid gap-3 sm:mb-10 sm:gap-4 sm:grid-cols-2'>
                    {/* Current Price */}
                    <div className='group relative overflow-hidden rounded-xl border border-white/10 bg-black/40 p-4 transition-all hover:border-white/20 sm:p-6'>
                        <div className='mb-2 flex items-center gap-2 sm:mb-3'>
                            <div className='flex h-7 w-7 items-center justify-center rounded-lg bg-white/5 sm:h-8 sm:w-8'>
                                <span className='material-symbols-outlined text-sm text-gray-400'>payments</span>
                            </div>
                            <span className='text-[10px] font-bold uppercase tracking-wider text-gray-500 sm:text-xs'>Giá hiện tại</span>
                        </div>
                        <div className='font-mono text-2xl font-bold text-white sm:text-3xl'>{recommendation.currentPrice.toFixed(2)}</div>
                    </div>

                    {/* Change */}
                    <div className='group relative overflow-hidden rounded-xl border border-white/10 bg-black/40 p-4 transition-all hover:border-white/20 sm:p-6'>
                        <div className='mb-2 flex items-center gap-2 sm:mb-3'>
                            <div className={`flex h-7 w-7 items-center justify-center rounded-lg ${recommendation.changeBuy >= 0 ? 'bg-green-500/10' : 'bg-red-500/10'} sm:h-8 sm:w-8`}>
                                <span className={`material-symbols-outlined text-sm ${recommendation.changeBuy >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                    {recommendation.changeBuy >= 0 ? 'trending_up' : 'trending_down'}
                                </span>
                            </div>
                            <span className='text-[10px] font-bold uppercase tracking-wider text-gray-500 sm:text-xs'>Thay đổi</span>
                        </div>
                        <div className='flex flex-col'>
                            <span className={`font-mono text-2xl font-bold ${recommendation.changeBuy >= 0 ? 'text-green-500' : 'text-red-500'} sm:text-3xl`}>
                                {recommendation.changeBuy >= 0 ? '+' : ''}{recommendation.changeBuy.toFixed(2)}
                            </span>
                            <span className={`text-xs ${recommendation.changePercent >= 0 ? 'text-green-500' : 'text-red-500'} sm:text-sm`}>
                                ({recommendation.changePercent >= 0 ? '+' : ''}{recommendation.changePercent.toFixed(2)}%)
                            </span>
                        </div>
                    </div>
                </div>

                {/* Timestamp */}
                <div className='flex items-center justify-center gap-2 border-t border-white/10 pt-4 sm:gap-3 sm:pt-6'>
                    <div className='flex h-7 w-7 items-center justify-center rounded-lg bg-white/5 sm:h-8 sm:w-8'>
                        <span className='material-symbols-outlined text-sm text-gray-500'>schedule</span>
                    </div>
                    <span className='text-xs text-gray-500 sm:text-sm'>
                        Cập nhật: {new Date(recommendation.generatedAt).toLocaleString('vi-VN')}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default SignalCard;
