import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/jwt';
import type { DeleteUserResponse } from '@/types/api';
import { NextResponse } from 'next/server';

const DELETE = async (request: Request, { params }: { params: Promise<{ id: string }> }) => {
    try {
        const authHeader = request.headers.get('authorization');

        if (!authHeader?.startsWith('Bearer ')) {
            return NextResponse.json({ error: 'Unauthorized' } as DeleteUserResponse, { status: 401 });
        }

        const token = authHeader.substring(7);
        const payload = await verifyToken(token);

        if (!payload) {
            return NextResponse.json({ error: 'Invalid token' } as DeleteUserResponse, { status: 401 });
        }

        const { id } = await params;
        const userId = Number.parseInt(id, 10);

        if (Number.isNaN(userId)) {
            return NextResponse.json({ error: 'ID người dùng không hợp lệ' } as DeleteUserResponse, {
                status: 400
            });
        }

        const user = await prisma.user.findUnique({
            where: { id: userId }
        });

        if (!user) {
            return NextResponse.json({ error: 'Không tìm thấy người dùng' } as DeleteUserResponse, {
                status: 404
            });
        }

        await prisma.user.delete({
            where: { id: userId }
        });

        return NextResponse.json(
            { success: true, message: 'Xóa người dùng thành công' } as DeleteUserResponse,
            { status: 200 }
        );
    } catch (error) {
        console.error('Delete user error:', error);
        return NextResponse.json(
            { error: 'Đã xảy ra lỗi khi xóa người dùng' } as DeleteUserResponse,
            { status: 500 }
        );
    }
};

export { DELETE };
