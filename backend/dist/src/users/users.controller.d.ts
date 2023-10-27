import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<{
        id: string;
        name: string;
        email: string;
        password: string;
        permissions: "LIST_USERS"[];
        created_at: Date;
        updated_at: Date;
    }>;
    findAll(): Promise<{
        id: string;
        name: string;
        email: string;
        password: string;
        permissions: "LIST_USERS"[];
        created_at: Date;
        updated_at: Date;
    }[]>;
    findOne(email: string): Promise<{
        id: string;
        name: string;
        email: string;
        password: string;
        permissions: "LIST_USERS"[];
        created_at: Date;
        updated_at: Date;
    }>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        id: string;
        name: string;
        email: string;
        password: string;
        permissions: "LIST_USERS"[];
        created_at: Date;
        updated_at: Date;
    }>;
    remove(id: string): Promise<{
        id: string;
        name: string;
        email: string;
        password: string;
        permissions: "LIST_USERS"[];
        created_at: Date;
        updated_at: Date;
    }>;
}
