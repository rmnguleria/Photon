import { RoleRequest } from '../_models/role-request';
import { User } from '../_models/user';
import { RoleInfo } from '../_models/role-info';
import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private userInfo: User;
  private selectedRole: RoleInfo = new RoleInfo();
  private selectedRoles: RoleInfo[] = new Array();
  private roleRequest: RoleRequest = new RoleRequest();
  private groupRoleInfo: any;

  roles= ['Campaign Owner', 'Campaign Manager', 'Campaign Viewer'];
  tenants = [];
  pos = [];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getGroupRoleMap().then(groupRoleData => this.groupRoleInfo = groupRoleData);
    this.userService.getUserInfo().then(userInfo => this.userInfo = userInfo);
  }

  onRoleChange(newRole) {
    this.tenants = [];
    for (let i = 0; i < this.groupRoleInfo.length ; i++) {
      let groupRole = this.groupRoleInfo[i];
      if (groupRole['role'] === this.selectedRole.role && this.tenants.indexOf(groupRole['tenant']) === -1) {
        this.tenants.push(groupRole['tenant']);
      }
    }
  }

  onTenantChange(newTenant) {
    this.pos = [];
    for (let i = 0; i < this.groupRoleInfo.length ; i++) {
      let groupRole = this.groupRoleInfo[i];
      if (groupRole['tenant'] === newTenant && groupRole['role'] === this.selectedRole.role) {
        this.pos.push(groupRole['pos']);
      }
    }
  }

  onAddRole() {
    for (let i = 0; i < this.groupRoleInfo.length ; i++) {
      let groupRole = this.groupRoleInfo[i];
      if (groupRole['tenant'] === this.selectedRole.tenant &&
        groupRole['pos'] === this.selectedRole.pos &&
        groupRole['role'] === this.selectedRole.role) {
          let role: RoleInfo = new RoleInfo();
          role.groupRoleId = groupRole['groupRoleId'];
          role.tenant = this.selectedRole.tenant;
          role.pos = this.selectedRole.pos;
          role.role = this.selectedRole.role;
          this.selectedRoles.push(role);
          break;
      }
    }
  }

  onSubmit() {
    this.roleRequest.requestedRoles = new Array();
    this.roleRequest.requestedRoles = this.selectedRoles;
    this.userService.submitRoleRequest(this.roleRequest).then(response => 1 + 1);
  }

  removeRole(role: RoleInfo) {
    for (let i = 0; i < this.selectedRoles.length ; i++) {
      if (this.selectedRoles[i].groupRoleId === role.groupRoleId) {
        // this.roleRequest.requestedRoles.splice(i, 1);
        this.selectedRoles.splice(i, 1);
        break;
      }
    }
  }

}
