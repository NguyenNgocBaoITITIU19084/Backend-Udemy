import { SetMetadata } from "@nestjs/common"
import { ROLES } from "../enums/roles.enums";

export const ROLE_KEY = 'roles';

export const Roles = (...roles: [ROLES, ...ROLES[]]) => SetMetadata(ROLE_KEY, roles);