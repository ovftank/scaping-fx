import type { FC } from 'react';

const ChartIcon: FC = () => {
    return (
        <svg className='h-full w-full' preserveAspectRatio='none' viewBox='0 0 100 100' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <defs>
                <linearGradient id='goldGradient' x1='0%' x2='0%' y1='0%' y2='100%'>
                    <stop offset='0%' stopColor='#F59E0B' stopOpacity='0.4' />
                    <stop offset='100%' stopColor='#F59E0B' stopOpacity='0' />
                </linearGradient>
            </defs>
            <path d='M0 80 Q 20 60 40 75 T 80 40 L 100 20 L 100 100 L 0 100 Z' fill='url(#goldGradient)' />
            <path d='M0 80 Q 20 60 40 75 T 80 40 L 100 20' stroke='#F59E0B' strokeWidth='0.5' strokeLinecap='round' />
        </svg>
    );
};

export default ChartIcon;
