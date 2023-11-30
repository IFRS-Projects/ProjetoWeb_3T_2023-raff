"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const request = require("supertest");
const movies_module_1 = require("./../src/modules/movies/movies.module");
const movie_entity_1 = require("./../src/modules/movies/entities/movie.entity");
const cookieParser = require("cookie-parser");
describe('Movies Controller (E2E)', () => {
    let app;
    beforeEach(async () => {
        const moduleFixture = await testing_1.Test.createTestingModule({
            imports: [movies_module_1.MoviesModule],
        }).compile();
        app = moduleFixture.createNestApplication();
        app.use(cookieParser());
        await app.init();
    });
    it('/movies/ ( GET )', () => {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlMzliMTY0NS1jNTRhLTQ1ZTUtYWZmMC1iNWQ4ODFjYzA2NWIiLCJ1c2VybmFtZSI6ImNhcmxpbmhvcyBzZW0gbWFpYSIsImVtYWlsIjoiY2FybGluaG9zQGFsdW5vLmZlbGl6LmlmcnMuZWR1LmJyIiwicGVybWlzc2lvbnMiOltdLCJpYXQiOjE2OTg4NDkyNjAsImV4cCI6MTY5OTQ0OTI2MH0.Yl_BrDPT-bPIr1ajTgMbd0RHWvu33m4I2N9irr0qqIs';
        return request(app.getHttpServer())
            .get('/movies/')
            .set('Cookie', `token=${token}`)
            .expect(200)
            .expect((res) => {
            expect(res.body).toBeInstanceOf(Array);
            expect(res.body.every((item) => item instanceof movie_entity_1.Movie));
        });
    });
    let id;
    it('/movies/ ( POST )', async () => {
        id = await request(app.getHttpServer())
            .post('/movies/')
            .field('title', 'A good title')
            .field('description', ' good description')
            .attach('file', '/home/raff/Pictures/Screenshot_20230803_145037.png')
            .expect(201)
            .expect((res) => {
            expect(res.body).toBeInstanceOf(Object);
            return res.body;
        })
            .then((res) => res.body.id);
    });
    it('/movies/:id ( GET )', () => {
        return request(app.getHttpServer())
            .get(`/movies/${id}`)
            .expect(200)
            .expect((res) => {
            expect(res.body).toEqual(expect.objectContaining({ ...movie_entity_1.Movie }));
        });
    });
    it('/movies/:id (PATCH)', () => {
        return request(app.getHttpServer())
            .patch(`/movies/${id}`)
            .send({ title: 'qqq', description: 'A bad description' })
            .expect(200)
            .expect((res) => {
            expect(res.body).toEqual(expect.objectContaining({
                ...movie_entity_1.Movie,
                title: 'qqq',
                description: 'A bad description',
            }));
        });
    });
    it('/movies/:id (DELETE)', () => {
        return request(app.getHttpServer())
            .delete(`/movies/${id}`)
            .expect(200)
            .expect((res) => {
            expect(res.body).toEqual({});
        });
    });
});
//# sourceMappingURL=movies.e2e-spec.js.map