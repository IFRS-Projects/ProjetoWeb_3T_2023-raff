"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserId = void 0;
const common_1 = require("@nestjs/common");
const jwt_decode_1 = require("./../utils/jwt-decode");
exports.UserId = (0, common_1.createParamDecorator)((_, ctx) => {
    const { cookies } = ctx.switchToHttp().getRequest();
    const jwt = (0, jwt_decode_1.DecodeJwtToken)(cookies.token);
    return jwt?.sub;
});
//# sourceMappingURL=get-user-id.decorator.js.map