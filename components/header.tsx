'use client';

import Link from 'next/link';
import type { FC } from 'react';

const navigation = [
    { name: 'Tín hiệu', href: '/#live-signals' },
    { name: 'Hiệu suất', href: '/#history' },
    { name: 'Công nghệ AI', href: '/#technology' },
    { name: 'Hỗ trợ', href: '/#footer' }
];

const Header: FC = () => {
    return (
        <header className='sticky top-0 z-50 w-full border-b border-white/10 bg-black/80 backdrop-blur-md'>
            <div className='mx-auto flex h-20 max-w-7xl items-center justify-between px-6'>
                <div className='flex items-center gap-2'>
                    <Link href='/' className='flex items-center gap-2 text-xl font-bold tracking-tight text-white'>
                        <span className='material-symbols-outlined text-amber-500'>candlestick_chart</span> Scaping<span className='text-amber-500'>Fx</span>
                    </Link>
                </div>

                <nav className='hidden items-center gap-6 sm:flex'>
                    {navigation.map((item) => (
                        <a key={item.name} href={item.href} className='rounded px-2 py-1 text-base font-medium text-gray-300 transition-colors hover:text-amber-500 focus-visible:bg-white/5 focus-visible:ring-2 focus-visible:ring-amber-500/50 focus-visible:outline-none'>
                            {item.name}
                        </a>
                    ))}
                </nav>

                <div className='flex items-center gap-3'>
                    <Link href='/dang-nhap' className='hidden rounded px-4 py-2 text-sm font-bold text-white transition-colors hover:text-amber-500 focus-visible:bg-white/5 focus-visible:ring-2 focus-visible:ring-amber-500/50 focus-visible:outline-none sm:block'>
                        Đăng nhập
                    </Link>
                    <Link href='/dang-ki' className='touch-action-manipulation flex h-10 items-center justify-center rounded-lg bg-amber-500 px-6 text-sm font-bold text-black shadow-[0_0_15px_rgba(245,159,10,0.3)] transition-all hover:bg-amber-600 hover:shadow-[0_0_25px_rgba(245,159,10,0.5)] focus-visible:ring-2 focus-visible:ring-amber-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:outline-none'>
                        Đăng ký
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
