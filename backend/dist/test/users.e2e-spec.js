"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const user_dto_1 = require("./../src/modules/users/dto/user.dto");
const users_module_1 = require("./../src/modules/users/users.module");
const request = require("supertest");
describe('Users Controller (E2E)', () => {
    let app;
    const alfh = 'abcdefghijklmnopqrstuvwxyz';
    const randomChar = (latters) => {
        let randomWord = '';
        for (let i = 0; i < latters; i++) {
            randomWord += alfh[Math.floor(Math.random() * alfh.length)];
        }
        return randomWord;
    };
    beforeEach(async () => {
        const moduleFixture = await testing_1.Test.createTestingModule({
            imports: [users_module_1.UsersModule],
        }).compile();
        app = moduleFixture.createNestApplication();
        await app.init();
    });
    it('/users/ (GET)', () => {
        return request(app.getHttpServer())
            .get('/users/')
            .expect(200)
            .expect((res) => {
            expect(res.body).toBeInstanceOf(Array);
            expect(res.body.every((item) => item instanceof user_dto_1.userDTO));
        });
    });
    it('/users/:email (GET)', () => {
        return request(app.getHttpServer())
            .get('/users/admin@aluno.feliz.ifrs.edu.br')
            .expect(200)
            .expect((res) => {
            expect(res.body).toEqual(expect.objectContaining({
                id: res.body.id,
                name: res.body.name,
                email: res.body.email,
                password: res.body.password,
                created_at: res.body.created_at,
                updated_at: res.body.updated_at,
            }));
        });
    });
    it('/users/:email (ERROR GET)', () => {
        return request(app.getHttpServer())
            .get('/users/@aluno.feliz.ifrs.edu.br')
            .expect(404)
            .expect((res) => {
            expect(res.badRequest).toBeFalsy();
        });
    });
    let id;
    it('/users/ (POST)', async () => {
        id = await request(app.getHttpServer())
            .post('/users/')
            .send({
            name: randomChar(8),
            email: randomChar(5) + '@aluno.feliz.ifrs.edu.br',
            password: 'senhadasboas123denovo',
        })
            .expect(201)
            .expect((res) => {
            expect(res.body).toBeInstanceOf(Object);
            return res.body;
        })
            .then((res) => res.body.id);
    });
    it('/users/:id (DELETE)', () => {
        return request(app.getHttpServer()).delete(`/users/${id}`).expect(200);
    });
});
//# sourceMappingURL=users.e2e-spec.js.map