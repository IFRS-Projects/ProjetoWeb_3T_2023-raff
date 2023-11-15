"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const cookieParser = require("cookie-parser");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(cookieParser());
    app.useGlobalPipes(new common_1.ValidationPipe({
        stopAtFirstError: true,
    }));
    app.enableCors({
        credentials: true,
        origin: 'http://localhost:3000',
        allowedHeaders: '*',
    });
    await app.listen(4000);
}
bootstrap();
//# sourceMappingURL=main.js.map