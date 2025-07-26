import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth/auth.service';
import { Users } from './users.entity';
import {NotFoundException} from '@nestjs/common';

describe('UsersController', () => {
  let controller: UsersController;
  let usersService: Partial<UsersService>;
  let authService: Partial<AuthService>;

  beforeEach(async () => {
    usersService = {
      findOne: (id: number) => Promise.resolve([{id, email: 'bao@email.com', password: "123456"} as Users]),
      find: (email: string) => Promise.resolve([{id: 1, email, password: "123"} as Users]),
      removeUser: () => Promise.resolve({} as Users),
      update: () => Promise.resolve({} as Users),
    }
    authService = {
      signup: (email: string, password: string ) => Promise.resolve({id: 1, email, password} as Users),
      signin: (email: string, password: string) => Promise.resolve({id: 1, email, password} as Users),
    }

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers:[
        { provide: UsersService, useValue: usersService },
        { provide: AuthService, useValue: authService },
      ]
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return user by id', async () => {
    const user = await controller.findOne('1');
    expect(user).toHaveLength(1);
    expect(user[0].id).toEqual(1);
  })

  it('should return user by email', async () => {
    const user = await controller.getUserByEmail("baobao@gmail.com")
    expect(user).toHaveLength(1);
    expect(user[0].email).toEqual("baobao@gmail.com");
  });

  it(('throw error if user id not found'), async () => {
    usersService.findOne = () => Promise.reject(new NotFoundException('User not found'));
    await expect(controller.findOne('999')).rejects.toThrow(NotFoundException);
  })
});
