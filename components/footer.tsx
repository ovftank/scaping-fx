'use client';

import Link from 'next/link';
import type { FC } from 'react';

const Footer: FC = () => {
    return (
        <div className='border-t border-white/10 bg-[#050505] py-24' id='footer'>
            <div className='mx-auto max-w-7xl px-6'>
                <div className='mb-16 grid gap-12 sm:grid-cols-4'>
                    <div className='col-span-1 sm:col-span-2'>
                        <div className='mb-6 flex items-center gap-2'>
                            <span className='material-symbols-outlined text-amber-500'>candlestick_chart</span>
                            <span className='text-lg font-bold text-white'>
                                Scaping<span className='text-amber-500'>Fx</span>
                            </span>
                        </div>
                        <p className='max-w-sm text-sm leading-relaxed text-gray-500'>ScapingFx cung cấp các tín hiệu giao dịch Vàng (XAU/USD) được hỗ trợ bởi AI cho mục đích tham khảo. Giao dịch Vàng ký quỹ mang lại rủi ro cao, vui lòng cân nhắc kỹ trước khi tham gia.</p>
                    </div>
                    <div>
                        <div className='mb-4 font-bold text-white'>Dịch vụ</div>
                        <ul className='space-y-3 text-sm text-gray-500'>
                            <li>
                                <Link className='rounded transition-colors hover:text-amber-500 focus-visible:ring-2 focus-visible:ring-amber-500/50 focus-visible:outline-none' href='/#live-signals'>
                                    Tín hiệu Live
                                </Link>
                            </li>
                            <li>
                                <Link className='rounded transition-colors hover:text-amber-500 focus-visible:ring-2 focus-visible:ring-amber-500/50 focus-visible:outline-none' href='/#history'>
                                    Lịch sử giao dịch
                                </Link>
                            </li>
                            <li>
                                <Link className='rounded transition-colors hover:text-amber-500 focus-visible:ring-2 focus-visible:ring-amber-500/50 focus-visible:outline-none' href='/#technology'>
                                    Công nghệ AI
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <div className='mb-4 font-bold text-white'>Hỗ trợ</div>
                        <ul className='space-y-3 text-sm text-gray-500'>
                            <li>
                                <Link className='rounded transition-colors hover:text-amber-500 focus-visible:ring-2 focus-visible:ring-amber-500/50 focus-visible:outline-none' href={process.env.NEXT_PUBLIC_TELEGRAM_URL ?? '#'} target='_blank' rel='noopener noreferrer'>
                                    Liên hệ Admin
                                </Link>
                            </li>
                            <li>
                                <Link className='rounded transition-colors hover:text-amber-500 focus-visible:ring-2 focus-visible:ring-amber-500/50 focus-visible:outline-none' href={process.env.NEXT_PUBLIC_TELEGRAM_URL ?? '#'} target='_blank' rel='noopener noreferrer'>
                                    Kênh Telegram
                                </Link>
                            </li>
                            <li>
                                <button className='rounded transition-colors hover:text-amber-500 focus-visible:ring-2 focus-visible:ring-amber-500/50 focus-visible:outline-none' type='button'>
                                    Điều khoản sử dụng
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 sm:flex-row'>
                    <p className='text-xs text-gray-600'>© 2026 ScapingFx. Chuyên gia tín hiệu Vàng.</p>
                </div>
            </div>
        </div>
    );
};

export default Footer;
