import { User } from "../entities/user.entity";

export type IUser = Omit<User, 'hashPassword'>