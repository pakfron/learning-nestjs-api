import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { NotFoundException } from '@nestjs/common';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeUsersService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    fakeUsersService = {
      findOne: (id: number) => {
        return Promise.resolve({
          id,
          email: 'asdf@asdf.com',
          password: '12345',
        } as User);
      },
      find: (email: string) => {
        return Promise.resolve([
          {
            id: 1,
            email,
            password: '12345',
          } as User,
        ]);
      },
      // remove: () => {},
      // update: () => {},
    };
    fakeAuthService = {
      // signup: () => {},
      signin: (email:string,password:string) => {
        return Promise.resolve({id:1,email,password} as User)
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        { provide: UsersService, useValue: fakeUsersService },
        {
          provide: AuthService,
          useValue: fakeAuthService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAllUsers return a list of user with the given email',async ()=>{
    const user = await controller.findAllUsers('asdf@asdf.com')
    expect(user.length).toEqual(1);
    expect(user[0].email).toEqual(`asdf@asdf.com`)
  })
  it('findUser return single user with the given id',async ()=>{
    const user = await controller.findUser(`1`);
    expect(user).toBeDefined()
  })
  it(`findUser throws an error if user with given id is not found`,async()=>{
    fakeUsersService.findOne = ()=>null
    await expect(controller.findUser(`1`)).rejects.toThrow(NotFoundException)
  })
  it('signin update session object and return User',async ()=>{
    const session = {userId:-10};
    const user = await controller.signin({email:`asdf@asdf.com`,password:`12345`},
    session
    )
    expect(user.id).toEqual(1)
    expect(session.userId).toEqual(1)
  })
});
