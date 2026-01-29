'use client';

import type { FC } from 'react';


const LiveSignalsSection: FC = () => {
    return (
        <div className='relative overflow-hidden border-t border-white/5 bg-black py-24' id='live-signals'>
            <div className='pointer-events-none absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-amber-500/5 blur-[128px]' />
            <div className='relative z-10 mx-auto max-w-7xl px-6'>
                <div className='mb-16 text-center'>
                    <div className='mb-4 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1'>
                        <span className='relative inline-flex h-2 w-2 rounded-full bg-amber-500' />
                        <span className='text-xs font-semibold tracking-wider text-amber-500 uppercase'>Cập nhật thời gian thực</span>
                    </div>
                    <div className='mb-4 text-3xl font-bold tracking-tight text-white sm:text-5xl'>Bảng Tín Hiệu Giao Dịch</div>
                    <p className='mx-auto max-w-xl text-gray-400'>Theo dõi trực tiếp các điểm Entry, SL và TP cho cặp XAU/USD từ hệ thống AI.</p>
                </div>
                <div className='grid gap-6 sm:grid-cols-3' style={{ contentVisibility: 'auto' }}>
                    <div className='relative col-span-1 overflow-hidden rounded-2xl border border-amber-500/50 bg-[#111] p-6 shadow-[0_0_40px_rgba(245,159,10,0.1)] sm:col-span-3 sm:p-10'>
                        <div className='absolute top-0 right-0 rounded-bl-lg bg-amber-500 px-4 py-1.5 text-xs font-bold text-black'>RUNNING</div>
                        <div className='flex flex-col items-center justify-between gap-8 sm:flex-row'>
                            <div className='flex w-full items-center gap-6 sm:w-auto'>
                                <div className='flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-amber-500/30 bg-amber-500/10'>
                                    <span className='material-symbols-outlined text-4xl text-amber-500'>token</span>
                                </div>
                                <div>
                                    <div className='text-3xl font-bold text-white'>XAU/USD</div>
                                    <div className='mt-2 flex items-center gap-3'>
                                        <span className='rounded bg-green-500/10 px-3 py-1 text-sm font-bold tracking-wide text-green-500'>BUY NOW</span>
                                        <span className='font-mono text-lg text-gray-400'>@ 4953.30</span>
                                    </div>
                                </div>
                            </div>
                            <div className='flex w-full flex-wrap justify-center gap-8 border-y border-white/10 py-6 text-center sm:w-auto sm:gap-16 sm:border-x sm:border-y-0 sm:px-12 sm:py-0'>
                                <div>
                                    <p className='mb-2 text-xs font-semibold tracking-wider text-gray-500 uppercase'>Stop Loss (SL)</p>
                                    <p className='font-mono text-2xl font-bold text-white'>4940.00</p>
                                </div>
                                <div>
                                    <p className='mb-2 text-xs font-semibold tracking-wider text-gray-500 uppercase'>Take Profit 1</p>
                                    <p className='font-mono text-2xl font-bold text-amber-500'>4965.00</p>
                                </div>
                                <div>
                                    <p className='mb-2 text-xs font-semibold tracking-wider text-gray-500 uppercase'>Take Profit 2</p>
                                    <p className='font-mono text-2xl font-bold text-amber-500'>4980.00</p>
                                </div>
                            </div>
                            <div className='w-full text-center sm:w-auto sm:text-right'>
                                <p className='mb-2 text-sm text-gray-400'>Lợi nhuận hiện tại</p>
                                <p className='text-4xl font-bold text-amber-500' style={{ textShadow: '0 0 20px rgba(245, 159, 10, 0.5)' }}>
                                    +45 Pips
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='rounded-xl border border-white/10 bg-[#0a0a0a] p-6 transition-all hover:border-white/20'>
                        <div className='mb-6 flex items-start justify-between'>
                            <div className='flex items-center gap-2'>
                                <span className='h-2 w-2 rounded-full bg-amber-500' />
                                <span className='text-xs font-bold text-amber-500 uppercase'>Pending Limit</span>
                            </div>
                            <span className='text-xs text-gray-500'>10:30 AM</span>
                        </div>
                        <div className='mb-6 flex items-center justify-between'>
                            <div className='text-xl font-bold text-white'>XAU/USD</div>
                            <span className='rounded border border-white/20 bg-white/10 px-2 py-1 text-xs font-bold text-white'>SELL LIMIT</span>
                        </div>
                        <div className='space-y-4 text-sm'>
                            <div className='flex items-center justify-between border-b border-white/5 pb-2'>
                                <span className='text-gray-500'>Entry</span>
                                <span className='font-mono text-lg font-bold text-white'>4985.00</span>
                            </div>
                            <div className='flex items-center justify-between'>
                                <span className='text-gray-500'>Stop Loss</span>
                                <span className='font-mono text-gray-300'>4995.00</span>
                            </div>
                            <div className='flex items-center justify-between'>
                                <span className='text-gray-500'>Take Profit</span>
                                <span className='font-mono text-amber-500'>4960.00</span>
                            </div>
                        </div>
                    </div>
                    <div className='rounded-xl border border-white/10 bg-[#0a0a0a] p-6 transition-all hover:border-white/20'>
                        <div className='mb-6 flex items-start justify-between'>
                            <div className='flex items-center gap-2'>
                                <span className='h-2 w-2 rounded-full bg-amber-500' />
                                <span className='text-xs font-bold text-amber-500 uppercase'>Pending Limit</span>
                            </div>
                            <span className='text-xs text-gray-500'>09:15 AM</span>
                        </div>
                        <div className='mb-6 flex items-center justify-between'>
                            <div className='text-xl font-bold text-white'>XAU/USD</div>
                            <span className='rounded border border-amber-500/20 bg-amber-500/10 px-2 py-1 text-xs font-bold text-amber-500'>BUY LIMIT</span>
                        </div>
                        <div className='space-y-4 text-sm'>
                            <div className='flex items-center justify-between border-b border-white/5 pb-2'>
                                <span className='text-gray-500'>Entry</span>
                                <span className='font-mono text-lg font-bold text-white'>4930.00</span>
                            </div>
                            <div className='flex items-center justify-between'>
                                <span className='text-gray-500'>Stop Loss</span>
                                <span className='font-mono text-gray-300'>4920.00</span>
                            </div>
                            <div className='flex items-center justify-between'>
                                <span className='text-gray-500'>Take Profit</span>
                                <span className='font-mono text-amber-500'>4950.00</span>
                            </div>
                        </div>
                    </div>
                    <div className='rounded-xl border border-white/10 bg-[#0a0a0a] p-6 opacity-60 transition-opacity hover:opacity-100'>
                        <div className='mb-6 flex items-start justify-between'>
                            <div className='flex items-center gap-2'>
                                <span className='h-2 w-2 rounded-full bg-gray-500' />
                                <span className='text-xs font-bold text-gray-500 uppercase'>Expired</span>
                            </div>
                            <span className='text-xs text-gray-500'>Hôm qua</span>
                        </div>
                        <div className='mb-6 flex items-center justify-between'>
                            <div className='text-xl font-bold text-white'>XAU/USD</div>
                            <span className='rounded border border-white/20 bg-white/10 px-2 py-1 text-xs font-bold text-white'>SELL</span>
                        </div>
                        <div className='space-y-4 text-sm'>
                            <div className='flex items-center justify-between border-b border-white/5 pb-2'>
                                <span className='text-gray-500'>Entry</span>
                                <span className='font-mono text-lg font-bold text-white'>4960.00</span>
                            </div>
                            <div className='flex items-center justify-between'>
                                <span className='text-gray-500'>Kết quả</span>
                                <span className='font-mono font-bold text-amber-500'>+80 Pips</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LiveSignalsSection;
