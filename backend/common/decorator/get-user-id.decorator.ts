import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { DecodeJwtToken } from './../utils/jwt-decode';

export const UserId = createParamDecorator((_, ctx: ExecutionContext) => {
  const { cookies } = ctx.switchToHttp().getRequest();
  console.log(cookies);

  const jwt = DecodeJwtToken(cookies.token);
  return jwt?.sub;
});
