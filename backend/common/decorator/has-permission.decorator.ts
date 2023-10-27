import { SetMetadata } from '@nestjs/common';
import { Permission } from '@prisma/client';

export const HasPermission = (permission: Permission) =>
  SetMetadata('permission', permission);
