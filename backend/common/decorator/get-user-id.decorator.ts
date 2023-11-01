import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { DecodeJwtToken } from 'common/utils/jwt-decode';

export const UserId = createParamDecorator((_, ctx: ExecutionContext) => {
  const { cookie } = ctx.switchToHttp().getRequest().headers;

  const jwt = DecodeJwtToken(cookie);
  return jwt?.sub;
});
