'use client';

import type { FC } from 'react';

const HistorySection: FC = () => {
    return (
        <section className='border-t border-white/5 bg-[#050505] py-24' id='history'>
            <div className='mx-auto max-w-7xl px-6'>
                <div className='mb-12 flex flex-col items-end justify-between gap-6 sm:flex-row'>
                    <div>
                        <div className='mb-2 text-3xl font-bold text-white sm:text-4xl'>Lịch Sử Tín Hiệu</div>
                        <p className='text-gray-400'>Kết quả giao dịch XAU/USD đã đóng gần đây. Minh bạch tuyệt đối.</p>
                    </div>
                    <div className='flex gap-4 rounded-lg border border-white/10 bg-[#111] p-4'>
                        <div className='border-r border-white/10 pr-4 text-right'>
                            <p className='text-xs font-semibold text-gray-500 uppercase'>Tổng Pips (Tháng này)</p>
                            <p className='text-2xl font-bold text-amber-500'>+1,250 Pips</p>
                        </div>
                        <div className='pl-2 text-right'>
                            <p className='text-xs font-semibold text-gray-500 uppercase'>Win Rate</p>
                            <p className='text-2xl font-bold text-white'>92%</p>
                        </div>
                    </div>
                </div>
                <div className='overflow-x-auto rounded-xl border border-white/10'>
                    <table className='w-full border-collapse bg-[#0a0a0a] text-left'>
                        <thead>
                            <tr className='border-b border-white/10 bg-[#111] text-xs tracking-wider text-gray-500 uppercase'>
                                <th className='px-6 py-4 font-medium'>Thời gian</th>
                                <th className='px-6 py-4 font-medium'>Cặp tiền</th>
                                <th className='px-6 py-4 font-medium'>Loại lệnh</th>
                                <th className='px-6 py-4 font-medium'>Entry</th>
                                <th className='px-6 py-4 font-medium'>Exit</th>
                                <th className='px-6 py-4 text-right font-medium'>Lợi nhuận</th>
                            </tr>
                        </thead>
                        <tbody className='text-sm'>
                            <tr className='border-b border-white/5 transition-colors hover:bg-white/5'>
                                <td className='px-6 py-4 text-gray-400'>20/05 14:00</td>
                                <td className='px-6 py-4 font-bold text-white'>XAU/USD</td>
                                <td className='px-6 py-4'>
                                    <span className='rounded border border-amber-500/20 bg-amber-500/10 px-2 py-1 text-xs font-bold text-amber-500'>BUY</span>
                                </td>
                                <td className='px-6 py-4 font-mono text-gray-300'>4910.50</td>
                                <td className='px-6 py-4 font-mono text-gray-300'>4925.50</td>
                                <td className='px-6 py-4 text-right font-bold text-amber-500'>+150 Pips</td>
                            </tr>
                            <tr className='border-b border-white/5 transition-colors hover:bg-white/5'>
                                <td className='px-6 py-4 text-gray-400'>19/05 09:30</td>
                                <td className='px-6 py-4 font-bold text-white'>XAU/USD</td>
                                <td className='px-6 py-4'>
                                    <span className='rounded border border-white/20 bg-white/10 px-2 py-1 text-xs font-bold text-white'>SELL</span>
                                </td>
                                <td className='px-6 py-4 font-mono text-gray-300'>4930.00</td>
                                <td className='px-6 py-4 font-mono text-gray-300'>4918.00</td>
                                <td className='px-6 py-4 text-right font-bold text-amber-500'>+120 Pips</td>
                            </tr>
                            <tr className='border-b border-white/5 transition-colors hover:bg-white/5'>
                                <td className='px-6 py-4 text-gray-400'>18/05 20:15</td>
                                <td className='px-6 py-4 font-bold text-white'>XAU/USD</td>
                                <td className='px-6 py-4'>
                                    <span className='rounded border border-amber-500/20 bg-amber-500/10 px-2 py-1 text-xs font-bold text-amber-500'>BUY</span>
                                </td>
                                <td className='px-6 py-4 font-mono text-gray-300'>4905.20</td>
                                <td className='px-6 py-4 font-mono text-gray-300'>4915.20</td>
                                <td className='px-6 py-4 text-right font-bold text-amber-500'>+100 Pips</td>
                            </tr>
                            <tr className='border-b border-white/5 transition-colors hover:bg-white/5'>
                                <td className='px-6 py-4 text-gray-400'>18/05 11:00</td>
                                <td className='px-6 py-4 font-bold text-white'>XAU/USD</td>
                                <td className='px-6 py-4'>
                                    <span className='rounded border border-white/20 bg-white/10 px-2 py-1 text-xs font-bold text-white'>SELL</span>
                                </td>
                                <td className='px-6 py-4 font-mono text-gray-300'>4922.00</td>
                                <td className='px-6 py-4 font-mono text-gray-300'>4925.00</td>
                                <td className='px-6 py-4 text-right font-bold text-gray-400'>-30 Pips</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className='mt-8 text-center'>
                    <button className='mx-auto flex items-center justify-center gap-2 rounded text-sm font-medium text-amber-500 transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-amber-500/50 focus-visible:outline-none'>
                        Xem toàn bộ lịch sử <span className='material-symbols-outlined text-lg'>arrow_forward</span>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default HistorySection;
