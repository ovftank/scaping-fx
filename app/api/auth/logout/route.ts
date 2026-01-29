import { NextResponse } from 'next/server';

const POST = async () => {
    try {
        const response = NextResponse.redirect(new URL('/', process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'));
        response.cookies.delete('token');
        return response;
    } catch (error) {
        console.error('Logout error:', error);
        return NextResponse.redirect(new URL('/', process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'));
    }
};

export { POST };
