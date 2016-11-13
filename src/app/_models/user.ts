import { Role } from './role';
export class User {
    login: string;
    firstName: string;
    lastName: string;
    email: string;
    roles: Role[] = new Array();
}
