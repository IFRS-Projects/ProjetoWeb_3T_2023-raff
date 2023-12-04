"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaUniqueKeyDupExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const client_1 = require("@prisma/client");
let PrismaUniqueKeyDupExceptionFilter = class PrismaUniqueKeyDupExceptionFilter extends core_1.BaseExceptionFilter {
    catch(exception, host) {
        console.error(exception.message);
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const message = exception.message.replace(/\n/g, '').split('Unique')[1];
        switch (exception.code) {
            case 'P2002': {
                const status = common_1.HttpStatus.CONFLICT;
                response.status(status).json({
                    statusCode: status,
                    message: message,
                });
                break;
            }
            default:
                super.catch(exception, host);
                break;
        }
    }
};
exports.PrismaUniqueKeyDupExceptionFilter = PrismaUniqueKeyDupExceptionFilter;
exports.PrismaUniqueKeyDupExceptionFilter = PrismaUniqueKeyDupExceptionFilter = __decorate([
    (0, common_1.Catch)(client_1.Prisma.PrismaClientKnownRequestError)
], PrismaUniqueKeyDupExceptionFilter);
//# sourceMappingURL=Prisma-UniqueKeyDup.exception.js.map