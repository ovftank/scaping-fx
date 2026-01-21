'use client';

import axios from 'axios';
import Link from 'next/link';
import type { FC } from 'react';
import { useState } from 'react';

const RegisterPage: FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        if (password !== confirmPassword) {
            setError('Mật khẩu xác nhận không khớp');
            return;
        }

        if (password.length < 6) {
            setError('Mật khẩu phải có ít nhất 6 ký tự');
            return;
        }

        setIsLoading(true);

        try {
            const { data } = await axios.post<{ success: boolean; message: string }>('/api/auth/register', { username, password });
            if (data.success) {
                setSuccessMessage(data.message);
            }
        } catch (error) {
            console.error('Register failed:', error);
            if (axios.isAxiosError(error) && error.response?.data?.error) {
                setError(error.response.data.error);
            } else {
                setError('Đăng ký thất bại. Vui lòng thử lại.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='relative flex min-h-screen items-center justify-center overflow-x-hidden px-4 py-24'>
            <div className='bg-gradient-radial pointer-events-none absolute top-0 left-1/2 h-150 -translate-x-1/2 from-amber-500/10 to-transparent blur-[120px]' />

            <div className='glass-panel relative w-full max-w-md rounded-2xl border border-white/10 p-10 shadow-2xl'>
                <div className='mb-8 flex flex-col items-center'>
                    <div className='mb-2 flex items-center gap-2'>
                        <span className='material-symbols-outlined text-amber-500'>candlestick_chart</span>
                        <div className='text-2xl font-bold tracking-tight text-white uppercase'>
                            Scaping<span className='text-amber-500'>Fx</span>
                        </div>
                    </div>
                    <p className='text-sm font-medium text-gray-400'>Đăng ký tài khoản mới</p>
                </div>

                {error && (
                    <div className='mb-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3'>
                        <p className='text-center text-sm text-red-400'>{error}</p>
                    </div>
                )}

                {successMessage && (
                    <div className='mb-6 rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3'>
                        <p className='text-center text-sm text-green-400'>{successMessage}</p>
                    </div>
                )}

                <form className='space-y-5' onSubmit={handleSubmit}>
                    <div className='space-y-2'>
                        <label className='block text-sm font-medium text-gray-300' htmlFor='username'>
                            Tên đăng nhập
                        </label>
                        <div className='relative'>
                            <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
                                <span className='material-symbols-outlined text-gray-500'>person</span>
                            </div>
                            <input id='username' type='text' placeholder='Nhập tên đăng nhập' required minLength={3} autoComplete='username' spellCheck={false} value={username} onChange={(e) => setUsername(e.target.value)} className='block w-full rounded-lg border border-white/10 bg-black/40 py-3 pr-3 pl-10 text-sm text-white placeholder-gray-500 transition-colors focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 focus:outline-none' />
                        </div>
                    </div>

                    <div className='space-y-2'>
                        <label className='block text-sm font-medium text-gray-300' htmlFor='password'>
                            Mật khẩu
                        </label>
                        <div className='relative'>
                            <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
                                <span className='material-symbols-outlined text-gray-500'>lock</span>
                            </div>
                            <input id='password' type={showPassword ? 'text' : 'password'} placeholder='••••••••' required minLength={6} autoComplete='new-password' value={password} onChange={(e) => setPassword(e.target.value)} className='block w-full rounded-lg border border-white/10 bg-black/40 py-3 pr-10 pl-10 text-sm text-white placeholder-gray-500 transition-colors focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 focus:outline-none' />
                            <button type='button' onClick={() => setShowPassword(!showPassword)} className='absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 transition-colors hover:text-amber-500'>
                                <span className='material-symbols-outlined'>{showPassword ? 'visibility_off' : 'visibility'}</span>
                            </button>
                        </div>
                    </div>

                    <div className='space-y-2'>
                        <label className='block text-sm font-medium text-gray-300' htmlFor='confirmPassword'>
                            Xác nhận mật khẩu
                        </label>
                        <div className='relative'>
                            <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
                                <span className='material-symbols-outlined text-gray-500'>lock</span>
                            </div>
                            <input id='confirmPassword' type={showConfirmPassword ? 'text' : 'password'} placeholder='••••••••' required minLength={6} autoComplete='new-password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className='block w-full rounded-lg border border-white/10 bg-black/40 py-3 pr-10 pl-10 text-sm text-white placeholder-gray-500 transition-colors focus:border-amber-500 focus:ring-amber-500/50 focus:outline-none' />
                            <button type='button' onClick={() => setShowConfirmPassword(!showConfirmPassword)} className='absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 transition-colors hover:text-amber-500'>
                                <span className='material-symbols-outlined'>{showConfirmPassword ? 'visibility_off' : 'visibility'}</span>
                            </button>
                        </div>
                    </div>

                    <div>
                        <button type='submit' disabled={isLoading} className='touch-action-manipulation w-full rounded-lg bg-amber-500 px-4 py-3 text-sm font-bold tracking-wider text-black uppercase shadow-[0_0_20px_rgba(245,159,10,0.3)] transition-all hover:-translate-y-0.5 hover:bg-amber-600 hover:shadow-[0_0_30px_rgba(245,159,10,0.4)] focus-visible:ring-2 focus-visible:ring-amber-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50'>
                            {isLoading ? 'Đang xử lý...' : 'Đăng ký'}
                        </button>
                    </div>
                </form>

                <div className='mt-6 flex flex-col items-center gap-4 text-center'>
                    <p className='text-sm text-gray-400'>Đã có tài khoản?</p>
                    <Link href='/dang-nhap' className='w-full rounded-lg border border-amber-500/50 bg-transparent px-4 py-3 text-sm font-bold tracking-wider text-amber-500 uppercase transition-all hover:border-amber-500 hover:bg-amber-500/10 focus-visible:ring-2 focus-visible:ring-amber-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:outline-none'>
                        Đăng nhập
                    </Link>
                    <a href={process.env.NEXT_PUBLIC_TELEGRAM_URL} target='_blank' rel='noopener noreferrer' className='group inline-flex items-center justify-center gap-1 font-medium text-amber-500 transition-colors hover:text-amber-400'>
                        <span>Tham gia Telegram để được hỗ trợ</span>
                        <span className='material-symbols-outlined text-base transition-transform group-hover:translate-x-1'>arrow_forward</span>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
