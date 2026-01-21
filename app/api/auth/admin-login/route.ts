import { signToken } from '@/lib/jwt';
import { prisma } from '@/lib/prisma';
import type { AdminLoginResponse } from '@/types/api';
import { NextResponse } from 'next/server';

const POST = async (request: Request) => {
    try {
        const body = await request.json();

        const { username, password } = body;

        if (!username || !password) {
            return NextResponse.json({ error: 'Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu' } as AdminLoginResponse, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { username }
        });

        if (!user) {
            return NextResponse.json({ error: 'Tên đăng nhập hoặc mật khẩu không đúng' } as AdminLoginResponse, { status: 401 });
        }

        if (user.password !== password) {
            return NextResponse.json({ error: 'Tên đăng nhập hoặc mật khẩu không đúng' } as AdminLoginResponse, { status: 401 });
        }

        if (user.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Bạn không có quyền truy cập' } as AdminLoginResponse, { status: 403 });
        }

        const token = await signToken({
            userId: user.id,
            username: user.username
        });

        return NextResponse.json(
            {
                success: true,
                message: 'Đăng nhập thành công',
                token,
                userId: user.id,
                username: user.username
            } as AdminLoginResponse,
            { status: 200 }
        );
    } catch (error) {
        console.error('Admin login error:', error);
        return NextResponse.json({ error: 'Đã xảy ra lỗi khi đăng nhập' } as AdminLoginResponse, { status: 500 });
    }
};

export { POST };
