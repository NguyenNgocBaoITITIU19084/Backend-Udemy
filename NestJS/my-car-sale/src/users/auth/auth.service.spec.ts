import {Test} from "@nestjs/testing"
import {AuthService} from "./auth.service";
import { UsersService } from "../users.service";
import { Users } from "../users.entity";
import { BadRequestException } from "@nestjs/common";
describe('AuthService', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;

beforeEach( async () => {
   //create a fake copy of the UsersService
   let users: Users[] = [];
   fakeUsersService = {
    find: (email: string ) => {
      const filteredUsers = users.filter(user => user.email === email)
      return Promise.resolve(filteredUsers);
    },
    createUser: (email: string, password: string) => {
      const user: Users = { id: Math.floor(Math.random() * 9999), email, password } as Users;
      users.push(user);
      return Promise.resolve(user);
    },
  }

  const module = await Test.createTestingModule({
    providers: [
      AuthService,
      {
        provide: UsersService,
        useValue: fakeUsersService,
      },
    ],
  }).compile();

   service = module.get(AuthService);
});
 
  it('can create an instance of AuthService', async () => {
    expect(service).toBeDefined();
  })
  
  it('creates a new user with a salted and hashed password', async () => {
    const user = await service.signup('test@test.com', 'password123');
    await expect(user.password).not.toEqual('password123');
    const result = user.password.split('.');
    
    expect(result[0]).toBeDefined();
    expect(result[1]).toBeDefined();
  })

  it('throws an error if user signs up with an email that is in use', async () => {
    await service.signup('a@', 'password123')
    await expect(service.signup('a@', 'password123')).rejects.toThrow(BadRequestException);
  })

  it('throws an error if signin is called with an unused email', async () => {
    await service.signup('test123@test.com', 'password123')
    await expect(service.signin('qweqwewqe@test.com', 'password123')).rejects.toThrow(BadRequestException);
  })

  it('throws an error if an invalid password is provided', async () => {
    await service.signup('a@', 'wrongpassword123')
    await expect(service.signin('a@', 'wrongpassword')).rejects.toThrow(BadRequestException);  
  })

  it('returns a user if correct password is provided', async () => {
     await service.signup('a@', 'password123');
     await expect(service.signin('a@', 'password123')).resolves.toBeDefined()
  })
})

