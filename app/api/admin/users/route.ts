import { verifyToken } from '@/lib/jwt';
import { prisma } from '@/lib/prisma';
import type { GetUsersResponse } from '@/types/api';
import { NextResponse } from 'next/server';

const GET = async (request: Request) => {
    try {
        const authHeader = request.headers.get('authorization');

        if (!authHeader?.startsWith('Bearer ')) {
            return NextResponse.json({ error: 'Unauthorized' } as GetUsersResponse, { status: 401 });
        }

        const token = authHeader.substring(7);
        const payload = await verifyToken(token);

        if (!payload) {
            return NextResponse.json({ error: 'Invalid token' } as GetUsersResponse, { status: 401 });
        }

        const users = await prisma.user.findMany({
            where: {
                role: {
                    not: 'ADMIN'
                }
            },
            select: {
                id: true,
                username: true,
                active: true,
                createdAt: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return NextResponse.json(
            {
                success: true,
                users: users.map((user) => ({
                    ...user,
                    createdAt: user.createdAt.toLocaleDateString('vi-VN')
                }))
            } as GetUsersResponse,
            { status: 200 }
        );
    } catch (error) {
        console.error('Get users error:', error);
        return NextResponse.json({ error: 'Đã xảy ra lỗi khi lấy danh sách người dùng' } as GetUsersResponse, { status: 500 });
    }
};

export { GET };
