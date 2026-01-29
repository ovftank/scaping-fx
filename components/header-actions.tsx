'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { FC } from 'react';
import { useEffect, useState } from 'react';

interface HeaderActionsProps {
    userSession: { id: number; username: string } | null;
}

const HeaderActions: FC<HeaderActionsProps> = ({ userSession: initialUserSession }) => {
    const router = useRouter();
    const [userSession, setUserSession] = useState(initialUserSession);

    useEffect(() => {
        const updateSession = (): void => {
            const stored = localStorage.getItem('user_session');
            setUserSession(stored ? JSON.parse(stored) : null);
        };

        window.addEventListener('storage', updateSession);
        window.addEventListener('auth-changed', updateSession);

        return (): void => {
            window.removeEventListener('storage', updateSession);
            window.removeEventListener('auth-changed', updateSession);
        };
    }, []);

    const handleLogout = (): void => {
        // Remove cookie
        document.cookie = 'auth_token=; path=/; max-age=0';
        document.cookie = 'user_session=; path=/; max-age=0';
        // Remove localStorage
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_session');
        setUserSession(null);

        // Dispatch custom event for other components
        window.dispatchEvent(new Event('auth-changed'));

        router.push('/');
    };

    return (
        <div className='flex items-center gap-3'>
            {userSession ? (
                <>
                    <span className='hidden text-sm text-gray-400 sm:inline'>Xin chào, <span className='font-semibold text-white'>{userSession.username}</span></span>
                    <Link
                        href='/dashboard'
                        className='hidden rounded px-4 py-2 text-sm font-bold text-white transition-colors hover:text-amber-500 focus-visible:bg-white/5 focus-visible:ring-2 focus-visible:ring-amber-500/50 focus-visible:outline-none sm:block'
                    >
                        Dashboard
                    </Link>
                    <button
                        onClick={handleLogout}
                        className='flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-400 transition-all hover:border-red-500/50 hover:bg-red-500/20'
                    >
                        <span className='material-symbols-outlined text-base'>logout</span>
                        <span className='hidden sm:inline'>Đăng xuất</span>
                    </button>
                </>
            ) : (
                <>
                    <Link href='/dang-nhap' className='hidden rounded px-4 py-2 text-sm font-bold text-white transition-colors hover:text-amber-500 focus-visible:bg-white/5 focus-visible:ring-2 focus-visible:ring-amber-500/50 focus-visible:outline-none sm:block'>
                        Đăng nhập
                    </Link>
                    <Link href='/dang-ki' className='touch-action-manipulation flex h-10 items-center justify-center rounded-lg bg-amber-500 px-6 text-sm font-bold text-black shadow-[0_0_15px_rgba(245,159,10,0.3)] transition-all hover:bg-amber-600 hover:shadow-[0_0_25px_rgba(245,159,10,0.5)] focus-visible:ring-2 focus-visible:ring-amber-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:outline-none'>
                        Đăng ký
                    </Link>
                </>
            )}
        </div>
    );
};

export default HeaderActions;
