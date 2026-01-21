import { prisma } from '@/lib/prisma';
import type { RegisterRequest, RegisterResponse } from '@/types/api';
import { NextResponse } from 'next/server';

const POST = async (request: Request) => {
    try {
        const body = (await request.json()) as RegisterRequest;

        const { username, password } = body;

        if (!username || !password) {
            return NextResponse.json({ error: 'Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu' } as RegisterResponse, { status: 400 });
        }

        const existingUser = await prisma.user.findUnique({
            where: { username }
        });

        if (existingUser) {
            return NextResponse.json({ error: 'Tên đăng nhập đã được sử dụng' } as RegisterResponse, { status: 409 });
        }

        await prisma.user.create({
            data: {
                username,
                password,
                active: false
            }
        });

        return NextResponse.json(
            {
                success: true,
                message: 'Đăng ký thành công. Vui lòng liên hệ admin để kích hoạt tài khoản.'
            } as RegisterResponse,
            { status: 201 }
        );
    } catch (error) {
        console.error('Register error:', error);
        return NextResponse.json({ error: 'Đã xảy ra lỗi khi đăng ký' } as RegisterResponse, { status: 500 });
    }
};

export { POST };
