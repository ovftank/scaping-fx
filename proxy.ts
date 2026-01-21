import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export const proxy = (request: NextRequest) => {
    console.log('request:', {
        method: request.method,
        url: request.url,
        pathname: request.nextUrl.pathname,
        search: request.nextUrl.search,
        headers: Object.fromEntries(request.headers.entries())
    });

    return NextResponse.next();
};

export const config = {
    matcher: '/:path*'
};
