"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaNotFoundExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
let PrismaNotFoundExceptionFilter = class PrismaNotFoundExceptionFilter {
    catch(exception, host) {
        const context = host.switchToHttp();
        const res = context.getResponse();
        const messageError = exception.meta?.cause ?? exception.message;
        exception.code === 'P2025'
            ? res.status(404).json({
                statusCode: 404,
                message: messageError,
            })
            : res.status(500).json({
                statusCode: 500,
                message: messageError,
            });
    }
};
exports.PrismaNotFoundExceptionFilter = PrismaNotFoundExceptionFilter;
exports.PrismaNotFoundExceptionFilter = PrismaNotFoundExceptionFilter = __decorate([
    (0, common_1.Catch)(client_1.Prisma.PrismaClientKnownRequestError)
], PrismaNotFoundExceptionFilter);
//# sourceMappingURL=Prisma-notFound.exception.js.map