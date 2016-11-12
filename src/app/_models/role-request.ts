import { RoleInfo } from './role-info';
export class RoleRequest {
    requestedRoles: RoleInfo[] = new Array();
    managerEmail: string;
}