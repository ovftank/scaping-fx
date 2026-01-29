'use client';

import type { FC } from 'react';

const DashboardRefreshButton: FC = () => {
    const handleRefresh = (): void => {
        window.location.reload();
    };

    return (
        <div className='mb-6 flex justify-center sm:mb-8'>
            <button
                onClick={handleRefresh}
                className='flex w-full items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/5 px-6 py-3 text-sm font-medium text-white transition-all hover:border-amber-500/50 hover:bg-amber-500/10 sm:w-auto sm:px-8'
            >
                <span className='material-symbols-outlined text-base'>refresh</span>
                Làm mới tín hiệu
            </button>
        </div>
    );
};

export default DashboardRefreshButton;
