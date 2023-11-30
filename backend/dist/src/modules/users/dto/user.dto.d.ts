import { Permission } from '@prisma/client';
export declare class userDTO {
    id: string;
    name: string;
    email: string;
    password: string;
    permissions: Permission[];
    created_at: Date;
    updated_at: Date;
}
