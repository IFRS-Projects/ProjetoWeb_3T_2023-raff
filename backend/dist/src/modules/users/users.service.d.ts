import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare abstract class UsersService {
    abstract create(createUserDto: CreateUserDto): any;
    abstract findAll(): any;
    abstract findOne(email: string): any;
    abstract update(id: string, updateUserDto: UpdateUserDto): any;
    abstract remove(id: string): any;
}
