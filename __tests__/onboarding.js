const supertest= require('supertest');
const server= require('../api/server.js');

// call this hook to refresh seed data
// especially when making a POST req
beforeEach(async () => {
    // await db.seed.run();
});

// this stops from keeping knex connected to db
// while testing and stops showing the error in console
afterAll(async () => {
    // await db.destroy();
});

describe('Auth integration tests', () => {
    it('POST /api/auth/register', async () => {
        const payload= {
            username: 'Creed_Waterson',
            password: 'abc123',
        };
        const res= await supertest(server).post('/api/auth/register').send(payload);
        // console.log(res);
        expect(res.statusCode).toBe(201);
        expect(res.type).toBe('application/json');
        expect(res.body.username).toBe('Creed_Waterson');
    });

    it('POST /api/auth/login', async () => {
        const payload= {
            username: 'Creed_Waterson',
            password: 'abc123',
        };
        const res= await supertest(server).post('/api/auth/login').send(payload);
        // console.log(res);
        expect(res.statusCode).toBe(200);
        expect(res.type).toBe('application/json');
        expect(res.body.message).toMatch('Welcome Creed_Waterson!');
    });
});