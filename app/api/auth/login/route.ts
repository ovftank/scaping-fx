import { prisma } from '@/lib/prisma';
import type { LoginRequest, LoginResponse } from '@/types/api';
import { NextResponse } from 'next/server';

const POST = async (request: Request) => {
    try {
        const body = (await request.json()) as LoginRequest;

        const { username, password } = body;

        if (!username || !password) {
            return NextResponse.json({ error: 'Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu' } as LoginResponse, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { username }
        });

        if (!user) {
            return NextResponse.json({ error: 'Tên đăng nhập hoặc mật khẩu không đúng' } as LoginResponse, { status: 401 });
        }

        if (user.password !== password) {
            return NextResponse.json({ error: 'Tên đăng nhập hoặc mật khẩu không đúng' } as LoginResponse, { status: 401 });
        }

        if (user.role === 'ADMIN') {
            return NextResponse.json({ error: 'Đăng nhập không thành công' } as LoginResponse, { status: 403 });
        }

        if (!user.active) {
            return NextResponse.json({ error: 'Tài khoản chưa được kích hoạt' } as LoginResponse, { status: 403 });
        }

        return NextResponse.json(
            {
                success: true,
                message: 'Đăng nhập thành công'
            } as LoginResponse,
            { status: 200 }
        );
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({ error: 'Đã xảy ra lỗi khi đăng nhập' } as LoginResponse, { status: 500 });
    }
};

export { POST };
