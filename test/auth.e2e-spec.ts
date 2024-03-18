import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { setupApp } from '../src/setup-app';

describe('Authentication System', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();
  });

  it('handles a signup request', () => {
    const email = `assdf@asdf.com`
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({email:email,password:'12345'})
      .expect(201)
      .then((res)=>{
        const {id,email} = res.body
        expect(id).toBeDefined();
        expect(email).toEqual(email)
      })
  });

  it('signup as new user then get the currently login in user',async () => {
    const email = `asdfd@asdf.com`    
  const res = await request(app.getHttpServer())
    .post('/auth/signup')
    .send({email,password:'12345'})
    .expect(201)
    const cookie = res.get('Set-Cookie')
   const {body} = await request(app.getHttpServer())
    .get('/auth/whoami')
    .set('Cookie',cookie)
    .expect(200)
  expect(body.email).toEqual(email)
  })
});
