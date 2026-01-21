'use client';

import ctaChart from '@/assets/images/cta-chart.png';
import Link from 'next/link';
import type { FC } from 'react';

const CtaSection: FC = () => {
    return (
        <div className='px-6 py-24'>
            <div className='relative mx-auto max-w-7xl overflow-hidden rounded-2xl border border-white/10 bg-[#111]'>
                <div className='absolute inset-0 z-10 bg-linear-to-r from-black/80 to-transparent' />
                <div className='absolute inset-0 h-full w-full bg-cover bg-right opacity-40' style={{ backgroundImage: `url('${ctaChart.src}')` }} />
                <div className='relative z-20 flex flex-col items-center gap-12 p-10 sm:flex-row sm:p-20'>
                    <div className='flex-1 space-y-6'>
                        <div className='text-3xl leading-tight font-black text-white sm:text-5xl'>
                            Sẵn sàng giao dịch Vàng với <br />
                            <span className='text-amber-500'>lợi thế tuyệt đối?</span>
                        </div>
                        <p className='max-w-md text-lg text-gray-400'>Tham gia cùng cộng đồng nhà đầu tư sử dụng ScapingFx để tự động hóa phân tích và nhận tín hiệu SL/TP XAU/USD chính xác.</p>
                        <div className='flex flex-wrap gap-4 pt-4'>
                            <Link href='/dang-nhap' className='touch-action-manipulation h-12 rounded-lg border border-white/20 px-8 text-base font-bold text-white transition-colors hover:bg-white/5 focus-visible:ring-2 focus-visible:ring-amber-500/50 focus-visible:outline-none'>
                                Xem Live Chart
                            </Link>
                        </div>
                    </div>
                    <div className='w-full max-w-md flex-1'>
                        <div className='glass-panel transform rounded-xl border border-white/10 p-6 shadow-2xl transition-transform duration-500 hover:rotate-0 sm:rotate-3'>
                            <div className='mb-6 flex items-center justify-between'>
                                <div className='flex flex-col'>
                                    <span className='text-xs text-gray-400 uppercase'>Lợi nhuận Vàng (Tháng)</span>
                                    <span className='text-2xl font-bold text-white'>$12,450.00</span>
                                </div>
                                <div className='flex h-8 w-8 items-center justify-center rounded-full bg-amber-500/20'>
                                    <span className='material-symbols-outlined text-sm text-amber-500'>arrow_upward</span>
                                </div>
                            </div>
                            <div className='mb-4 flex h-24 w-full items-end gap-1'>
                                <div className='h-[40%] w-1/6 rounded-t-sm bg-white/10' />
                                <div className='h-[60%] w-1/6 rounded-t-sm bg-white/10' />
                                <div className='h-[30%] w-1/6 rounded-t-sm bg-white/10' />
                                <div className='h-[50%] w-1/6 rounded-t-sm bg-amber-500/30' />
                                <div className='h-[75%] w-1/6 rounded-t-sm bg-amber-500/60' />
                                <div className='h-[90%] w-1/6 rounded-t-sm bg-amber-500 shadow-[0_0_20px_rgba(245,159,10,0.15)]' />
                            </div>
                            <div className='flex gap-2'>
                                <div className='h-2 w-full overflow-hidden rounded-full bg-white/5'>
                                    <div className='h-full w-[75%] bg-amber-500' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CtaSection;
