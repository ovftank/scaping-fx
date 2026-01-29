import { signToken } from '@/lib/jwt';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

const POST = async (request: Request) => {
    try {
        const body = await request.json();

        const { username, password } = body;

        if (!username || !password) {
            return NextResponse.json({ error: 'Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu' }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { username: username, role: 'USER' }
        });

        if (!user) {
            return NextResponse.json({ error: 'Tài khoản không tồn tại' }, { status: 401 });
        }

        if (user.password !== password) {
            return NextResponse.json({ error: 'Mật khẩu không đúng' }, { status: 401 });
        }

        if (!user.active) {
            return NextResponse.json({ error: 'Tài khoản chưa được kích hoạt' }, { status: 403 });
        }

        const token = await signToken({
            userId: user.id,
            username: user.username
        });
        const response = NextResponse.json(
            {
                success: true,
                message: 'Đăng nhập thành công'
            },
            {
                status: 200
            }
        );
        response.cookies.set('token', token);
        return response;
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({ error: 'Đã xảy ra lỗi khi đăng nhập' }, { status: 500 });
    }
};

export { POST };
