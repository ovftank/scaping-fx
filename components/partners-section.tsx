'use client';

import type { FC } from 'react';

const PartnersSection: FC = () => {
    return (
        <section className='border-t border-white/5 bg-black py-24'>
            <div className='mx-auto max-w-7xl px-6 text-center'>
                <p className='mb-8 text-sm font-semibold tracking-widest text-gray-500 uppercase'>Tích hợp dữ liệu từ các nguồn uy tín</p>
                <div className='flex flex-wrap justify-center gap-12 opacity-40 grayscale transition-all duration-500 hover:grayscale-0'>
                    <div className='font-serif text-xl font-bold text-white italic'>Bloomberg</div>
                    <div className='text-xl font-bold tracking-widest text-white'>REUTERS</div>
                    <div className='font-mono text-xl font-bold text-white'>NASDAQ</div>
                    <div className='font-sans text-xl font-bold text-white'>TradingView</div>
                </div>
            </div>
        </section>
    );
};

export default PartnersSection;
