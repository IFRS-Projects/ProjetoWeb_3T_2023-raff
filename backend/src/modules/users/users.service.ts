import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

export abstract class UsersService {
  /**
   * create
   */
  public abstract create(createUserDto: CreateUserDto);
  public abstract findAll();
  public abstract findOne(email: string);
  public abstract update(id: string, updateUserDto: UpdateUserDto);
  public abstract remove(id: string);
}
