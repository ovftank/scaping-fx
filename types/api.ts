interface AdminLoginRequest {
    username: string;
    password: string;
}

interface AdminLoginResponse {
    success?: boolean;
    message?: string;
    error?: string;
    token?: string;
    userId?: number;
    username?: string;
}

interface User {
    id: number;
    username: string;
    active: boolean;
    createdAt: string;
    updatedAt: string;
}

interface GetUsersResponse {
    success?: boolean;
    users?: User[];
    error?: string;
}

interface DeleteUserResponse {
    success?: boolean;
    message?: string;
    error?: string;
}

interface ToggleActiveResponse {
    success?: boolean;
    message?: string;
    user?: {
        id: number;
        active: boolean;
    };
    error?: string;
}

interface JwtPayload {
    userId: number;
    username: string;
}

interface AdminSession {
    id: number;
    username: string;
}

interface UserSession {
    id: number;
    username: string;
}

export type { AdminLoginRequest, AdminLoginResponse, AdminSession, DeleteUserResponse, GetUsersResponse, JwtPayload, ToggleActiveResponse, User, UserSession };
