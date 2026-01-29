'use client';

import type { AdminSession, User } from '@/types/api';
import axios from 'axios';
import type { FC } from 'react';
import { useEffect, useState } from 'react';

const AdminPage: FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const [authToken, setAuthToken] = useState<string | null>(() => {
        if (typeof window === 'undefined') return null;
        return localStorage.getItem('auth_token');
    });

    const [adminSession, setAdminSession] = useState<AdminSession | null>(() => {
        if (typeof window === 'undefined') return null;
        const stored = localStorage.getItem('admin_session');
        return stored ? JSON.parse(stored) : null;
    });

    const [loginForm, setLoginForm] = useState({
        username: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoginLoading, setIsLoginLoading] = useState(false);
    const [loginError, setLoginError] = useState('');

    useEffect(() => {
        const fetchUsers = async (): Promise<void> => {
            if (!authToken) return;

            try {
                const { data } = await axios.get('/api/admin/users', {
                    headers: {
                        Authorization: `Bearer ${authToken}`
                    }
                });

                if (data.success && data.users) {
                    setUsers(data.users);
                }
            } catch (err) {
                console.error('Fetch users failed:', err);
            } finally {
                setIsLoading(false);
            }
        };

        if (authToken) {
            fetchUsers();
        } else {
            setIsLoading(false);
        }
    }, [authToken]);

    const handleLogin = async (formData: FormData): Promise<void> => {
        setLoginError('');
        setIsLoginLoading(true);

        const username = formData.get('username') as string;
        const password = formData.get('password') as string;

        try {
            const { data } = await axios.post('/api/auth/admin-login', {
                username,
                password
            });

            if (data.success && data.token) {
                localStorage.setItem('auth_token', data.token);
                localStorage.setItem(
                    'admin_session',
                    JSON.stringify({
                        id: data.userId,
                        username: data.username
                    })
                );
                setAdminSession({
                    id: data.userId,
                    username: data.username
                });
                setAuthToken(data.token);
                setLoginForm({ username: '', password: '' });
            }
        } catch (err) {
            console.error('Admin login failed:', err);
        } finally {
            setIsLoginLoading(false);
        }
    };

    const refreshUsers = async (): Promise<void> => {
        if (!authToken) return;

        try {
            const { data } = await axios.get('/api/admin/users', {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });

            if (data.success && data.users) {
                setUsers(data.users);
            }
        } catch (err) {
            console.error('Fetch users failed:', err);
        }
    };

    const handleToggleActive = async (userId: number): Promise<void> => {
        if (!authToken) return;

        try {
            await axios.post(`/api/admin/users/${userId}/toggle-active`, null, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });

            await refreshUsers();
        } catch (err) {
            console.error('Toggle active failed:', err);
        }
    };

    const handleDeleteUser = async (userId: number): Promise<void> => {
        if (!authToken) return;

        try {
            await axios.delete(`/api/admin/users/${userId}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });

            await refreshUsers();
        } catch (err) {
            console.error('Delete user failed:', err);

        }
    };

    const handleLogout = (): void => {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('admin_session');
        setAuthToken(null);
        setAdminSession(null);
        setUsers([]);
    };

    if (isLoading) {
        return (
            <div className='flex min-h-screen items-center justify-center'>
                <div className='text-white'>Đang tải...</div>
            </div>
        );
    }

    if (!adminSession) {
        return (
            <div className='flex min-h-screen items-center justify-center px-4 py-24'>
                <div className='w-full max-w-md border border-white/20 bg-white/5 p-8'>
                    <div className='mb-6 text-center'>
                        <div className='mb-4 text-xl font-bold text-white uppercase'>ScapingFx Admin</div>
                        <p className='text-sm text-white'>Đăng nhập</p>
                    </div>

                    {loginError && (
                        <div className='mb-4 border border-white bg-white/10 px-4 py-2'>
                            <p className='text-center text-sm text-white'>{loginError}</p>
                        </div>
                    )}

                    <form className='space-y-4' action={handleLogin}>
                        <div>
                            <label className='mb-1 block text-sm text-white' htmlFor='username'>
                                Tên đăng nhập
                            </label>
                            <input id='username' name='username' type='text' placeholder='Nhập tên đăng nhập' required autoComplete='username' spellCheck={false} value={loginForm.username} onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })} className='w-full rounded border border-white/20 bg-black px-3 py-2 text-sm text-white placeholder-white/50 focus:border-white focus:outline-none' />
                        </div>

                        <div>
                            <label className='mb-1 block text-sm text-white' htmlFor='password'>
                                Mật khẩu
                            </label>
                            <div className='relative'>
                                <input id='password' name='password' type={showPassword ? 'text' : 'password'} placeholder='••••••••' required autoComplete='current-password' value={loginForm.password} onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })} className='w-full rounded border border-white/20 bg-black px-3 py-2 pr-10 text-sm text-white placeholder-white/50 focus:border-white focus:outline-none' />
                                <button type='button' onClick={() => setShowPassword(!showPassword)} className='absolute top-1/2 right-2 -translate-y-1/2 text-white/60 hover:text-white'>
                                    <span className='material-symbols-outlined text-sm'>{showPassword ? 'visibility_off' : 'visibility'}</span>
                                </button>
                            </div>
                        </div>

                        <button type='submit' disabled={isLoginLoading} className='w-full rounded bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50'>
                            {isLoginLoading ? 'Đang xử lý...' : 'Đăng nhập'}
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className='px-4 py-6'>
            <div className='mx-auto max-w-6xl'>
                <div className='mb-6 flex items-center justify-between border-b border-white/10 pb-4'>
                    <div>
                        <div className='text-lg font-bold text-white'>Quản lý người dùng</div>
                        <p className='text-sm text-white'>Chào, {adminSession.username}</p>
                    </div>
                    <div className='flex gap-2'>
                        <button onClick={handleLogout} className='rounded border border-white/20 px-3 py-1 text-sm text-white hover:border-white hover:bg-white hover:text-black'>
                            Đăng xuất
                        </button>
                    </div>
                </div>



                <div className='overflow-hidden rounded border border-white/10'>
                    <div className='overflow-x-auto'>
                        <table className='w-full'>
                            <thead className='border-b border-white/10 bg-white/5'>
                                <tr>
                                    <th className='px-4 py-2 text-left text-xs font-medium text-white'>ID</th>
                                    <th className='px-4 py-2 text-left text-xs font-medium text-white'>Tên đăng nhập</th>
                                    <th className='px-4 py-2 text-left text-xs font-medium text-white'>Trạng thái</th>
                                    <th className='px-4 py-2 text-left text-xs font-medium text-white'>Ngày tạo</th>
                                    <th className='px-4 py-2 text-right text-xs font-medium text-white'>Hành động</th>
                                </tr>
                            </thead>
                            <tbody className='divide-y divide-white/10'>
                                {users.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className='px-4 py-8 text-center'>
                                            <p className='text-white/60'>Chưa có người dùng nào</p>
                                        </td>
                                    </tr>
                                ) : (
                                    users.map((user) => (
                                        <tr key={user.id} className='hover:bg-white/5'>
                                            <td className='px-4 py-2 text-sm text-white/80'>#{user.id}</td>
                                            <td className='px-4 py-2 text-sm text-white'>{user.username}</td>
                                            <td className='px-4 py-2 text-sm text-white/80'>
                                                <span className={`inline-block rounded px-2 py-0.5 text-xs ${user.active ? 'border border-white bg-white text-black' : 'border border-white/30 bg-transparent text-white/80'}`}>{user.active ? 'Hoạt động' : 'Vô hiệu'}</span>
                                            </td>
                                            <td className='px-4 py-2 text-sm text-white/60'>{user.createdAt}</td>
                                            <td className='px-4 py-2 text-right text-sm'>
                                                <div className='flex justify-end gap-2'>
                                                    {user.id !== adminSession.id && (
                                                        <>
                                                            <button onClick={() => handleToggleActive(user.id)} className='rounded border border-white/20 px-2 py-1 text-xs text-white/80 hover:border-white hover:bg-white hover:text-black'>
                                                                {user.active ? 'Vô hiệu' : 'Kích hoạt'}
                                                            </button>
                                                            <button onClick={() => handleDeleteUser(user.id)} className='rounded border border-white/20 px-2 py-1 text-xs text-white/80 hover:border-white hover:bg-white hover:text-black'>
                                                                Xóa
                                                            </button>
                                                        </>
                                                    )}
                                                    {user.id === adminSession.id && <span className='text-xs text-white/50'>(Bạn)</span>}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className='mt-4 border border-white/10 bg-white/5 px-4 py-2 text-center'>
                    <p className='text-sm text-white/60'>
                        Tổng: <span className='font-medium text-white'>{users.length}</span> người dùng
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
