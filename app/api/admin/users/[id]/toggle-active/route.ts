import { verifyToken } from '@/lib/jwt';
import { prisma } from '@/lib/prisma';
import type { ToggleActiveResponse } from '@/types/api';
import { NextResponse } from 'next/server';

const POST = async (request: Request, { params }: { params: Promise<{ id: string }> }) => {
    try {
        const authHeader = request.headers.get('authorization');

        if (!authHeader?.startsWith('Bearer ')) {
            return NextResponse.json({ error: 'Unauthorized' } as ToggleActiveResponse, { status: 401 });
        }

        const token = authHeader.substring(7);
        const payload = await verifyToken(token);

        if (!payload) {
            return NextResponse.json({ error: 'Invalid token' } as ToggleActiveResponse, { status: 401 });
        }

        const { id } = await params;
        const userId = Number.parseInt(id, 10);

        if (Number.isNaN(userId)) {
            return NextResponse.json({ error: 'ID người dùng không hợp lệ' } as ToggleActiveResponse, { status: 400 });
        }

        if (userId === payload.userId) {
            return NextResponse.json({ error: 'Không thể thay đổi trạng thái của chính mình' } as ToggleActiveResponse, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { id: userId }
        });

        if (!user) {
            return NextResponse.json({ error: 'Không tìm thấy người dùng' } as ToggleActiveResponse, { status: 404 });
        }

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: { active: !user.active },
            select: {
                id: true,
                active: true
            }
        });

        return NextResponse.json(
            {
                success: true,
                message: updatedUser.active ? 'Kích hoạt người dùng thành công' : 'Vô hiệu người dùng thành công',
                user: updatedUser
            } as ToggleActiveResponse,
            { status: 200 }
        );
    } catch (error) {
        console.error('Toggle active error:', error);
        return NextResponse.json({ error: 'Đã xảy ra lỗi khi thay đổi trạng thái' } as ToggleActiveResponse, { status: 500 });
    }
};

export { POST };
