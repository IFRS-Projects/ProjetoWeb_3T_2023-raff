import { Permission } from '@prisma/client';

export class userDTO {
  public id: string;
  public name: string;
  public email: string;
  public password: string;
  public permissions: Permission[];
  public created_at: Date;
  public updated_at: Date;
}
