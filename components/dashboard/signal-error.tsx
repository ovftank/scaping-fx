'use client';

import type { FC } from 'react';

interface SignalErrorProps {
    error: string;
    onRetry?: () => void;
}

const SignalError: FC<SignalErrorProps> = ({ error, onRetry }) => {
    return (
        <div className='glass-panel relative overflow-hidden rounded-2xl border border-red-500/30 bg-red-500/5 p-12'>
            <div className='flex flex-col items-center gap-6 text-center'>
                <div className='flex h-20 w-20 items-center justify-center rounded-full border-2 border-red-500/30 bg-red-500/10'>
                    <span className='material-symbols-outlined text-5xl text-red-500'>error</span>
                </div>
                <div>
                    <p className='text-2xl font-bold text-white'>Có lỗi xảy ra</p>
                    <p className='mt-2 text-base text-gray-400'>{error}</p>
                </div>
                {onRetry && (
                    <button
                        onClick={onRetry}
                        className='mt-4 flex items-center gap-2 rounded-lg bg-amber-500 px-8 py-3 text-sm font-bold text-black uppercase shadow-[0_0_20px_rgba(245,159,10,0.3)] transition-all hover:-translate-y-0.5 hover:bg-amber-600 hover:shadow-[0_0_30px_rgba(245,159,10,0.4)] focus-visible:ring-2 focus-visible:ring-amber-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:outline-none'
                    >
                        <span className='material-symbols-outlined text-lg'>refresh</span>
                        Thử lại
                    </button>
                )}
            </div>
        </div>
    );
};

export default SignalError;
