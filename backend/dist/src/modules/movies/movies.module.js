"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoviesModule = void 0;
const common_1 = require("@nestjs/common");
const movies_controller_1 = require("./movies.controller");
const movie_prisma_service_1 = require("./movie.prisma.service");
const movies_repositorie_1 = require("./repository/movies.repositorie");
const files_service_1 = require("../files/files.service");
const nestjs_form_data_1 = require("nestjs-form-data");
let MoviesModule = class MoviesModule {
};
exports.MoviesModule = MoviesModule;
exports.MoviesModule = MoviesModule = __decorate([
    (0, common_1.Module)({
        imports: [nestjs_form_data_1.NestjsFormDataModule.config({ storage: nestjs_form_data_1.MemoryStoredFile })],
        controllers: [movies_controller_1.MoviesController],
        providers: [
            {
                provide: movies_repositorie_1.MoviesRepository,
                useClass: movie_prisma_service_1.PrismaMovieService,
            },
            files_service_1.FilesService,
        ],
    })
], MoviesModule);
//# sourceMappingURL=movies.module.js.map