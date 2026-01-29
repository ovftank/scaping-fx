import { verifyToken } from '@/lib/jwt';
import { prisma } from '@/lib/prisma';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export const proxy = async (request: NextRequest) => {
    console.log('request:', {
        method: request.method,
        url: request.url,
        pathname: request.nextUrl.pathname,
        search: request.nextUrl.search,
        headers: Object.fromEntries(request.headers.entries())
    });

    const protectedRoutes = ['/dashboard'];
    const authRoutes = ['/dang-nhap', '/dang-ki'];
    const { pathname } = request.nextUrl;

    const token = request.cookies.get('token')?.value;
    let isAuthenticated = false;

    if (token) {
        try {
            const decoded = await verifyToken(token);
            if (decoded?.userId) {
                const user = await prisma.user.findUnique({
                    where: { id: decoded.userId }
                });
                if (user?.active) {
                    isAuthenticated = true;
                }
            }
        } catch (error) {
            console.error('Auth verification error:', error);
        }
    }

    if (protectedRoutes.some((route) => pathname.startsWith(route)) && !isAuthenticated) {
        const loginUrl = new URL('/dang-nhap', request.url);
        loginUrl.searchParams.set('callbackUrl', pathname);
        return NextResponse.redirect(loginUrl);
    }

    if (authRoutes.some((route) => pathname.startsWith(route)) && isAuthenticated) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return NextResponse.next();
};

export const config = {
    matcher: ['/:path*']
};
