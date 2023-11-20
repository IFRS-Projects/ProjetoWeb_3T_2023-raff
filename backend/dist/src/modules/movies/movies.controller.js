"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoviesController = void 0;
const common_1 = require("@nestjs/common");
const create_movie_dto_1 = require("./dto/create-movie.dto");
const update_movie_dto_1 = require("./dto/update-movie.dto");
const movies_repositorie_1 = require("./repository/movies.repositorie");
const files_service_1 = require("../files/files.service");
const platform_express_1 = require("@nestjs/platform-express");
const multer_config_1 = require("../files/multer-config");
const get_user_id_decorator_1 = require("./../../../common/decorator/get-user-id.decorator");
const nestjs_form_data_1 = require("nestjs-form-data");
let MoviesController = class MoviesController {
    constructor(moviesService, fileService) {
        this.moviesService = moviesService;
        this.fileService = fileService;
    }
    async create(createMovieDto, file, req) {
        console.log(file);
        const image_url = await this.fileService.create(file, req);
        const newDto = { ...createMovieDto, image_url };
        return await this.moviesService.create(newDto);
    }
    async findAll(userId) {
        return await this.moviesService.findAll(userId);
    }
    async findRank() {
        return await this.moviesService.findRank();
    }
    async findOne(id) {
        return await this.moviesService.findOne(id);
    }
    async update(id, updateMovieDto, userId) {
        if (!userId) {
            throw new common_1.UnauthorizedException('User not logged');
        }
        if (updateMovieDto.love_amount) {
            await this.moviesService.createLike(userId, id);
        }
        return await this.moviesService.update(id, {
            ...updateMovieDto,
            love_amount: Number(updateMovieDto.love_amount),
        });
    }
    async remove(id) {
        return await this.moviesService.remove(id);
    }
};
exports.MoviesController = MoviesController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', multer_config_1.default)),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_movie_dto_1.CreateMovieDto, Object, Object]),
    __metadata("design:returntype", Promise)
], MoviesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/'),
    __param(0, (0, get_user_id_decorator_1.UserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MoviesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('/rank'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MoviesController.prototype, "findRank", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MoviesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, nestjs_form_data_1.FormDataRequest)(),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, get_user_id_decorator_1.UserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_movie_dto_1.UpdateMovieDto, String]),
    __metadata("design:returntype", Promise)
], MoviesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MoviesController.prototype, "remove", null);
exports.MoviesController = MoviesController = __decorate([
    (0, common_1.Controller)('movies'),
    __metadata("design:paramtypes", [movies_repositorie_1.MoviesRepository,
        files_service_1.FilesService])
], MoviesController);
//# sourceMappingURL=movies.controller.js.map