import { RoleInfo } from './role-info';
export class RoleRequest {
    userId: string;
    userName: string;
    requestedRoles: RoleInfo[] = new Array();
    managerEmail: string;
    userEmail: string;
}
