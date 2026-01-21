import { SignJWT, jwtVerify } from 'jose';
import 'server-only';

interface JwtPayload {
    userId: number;
    username: string;
}

const secretKey = process.env.JWT_SECRET || 'fallback-secret-key-change-in-production';
const encodedKey = new TextEncoder().encode(secretKey);

export const signToken = async (payload: JwtPayload): Promise<string> => {
    return await new SignJWT({ ...payload }).setProtectedHeader({ alg: 'HS256' }).setIssuedAt().setExpirationTime('7d').sign(encodedKey);
};

export const verifyToken = async (token: string): Promise<JwtPayload | null> => {
    try {
        const { payload } = await jwtVerify(token, encodedKey, {
            algorithms: ['HS256']
        });
        return payload as unknown as JwtPayload;
    } catch {
        console.error('JWT verification failed');
        return null;
    }
};
