interface RegisterRequest {
    username: string;
    password: string;
}

interface LoginRequest {
    username: string;
    password: string;
}

interface RegisterResponse {
    success?: boolean;
    message?: string;
    error?: string;
}

interface LoginResponse {
    success?: boolean;
    message?: string;
    error?: string;
}

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

export type { AdminLoginRequest, AdminLoginResponse, DeleteUserResponse, GetUsersResponse, LoginRequest, LoginResponse, RegisterRequest, RegisterResponse, ToggleActiveResponse, User };
