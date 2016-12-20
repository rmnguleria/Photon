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
  private selectedRole: RoleInfo = new RoleInfo();
  private selectedRoles: RoleInfo[] = new Array();
  private roleRequest: RoleRequest = new RoleRequest();
  private groupRoleInfo: any;

  roles= ['Campaign Owner', 'Campaign Manager', 'Campaign Viewer'];
  tenants = [];
  pos = [];
  error = '';

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.selectedRole.pos = 'none';
    this.selectedRole.role = 'none';
    this.selectedRole.tenant = 'none';
    this.userService.getGroupRoleMap().then(groupRoleData => this.groupRoleInfo = groupRoleData);
  }

  onRoleChange(newRole) {
    this.error = '';
    this.tenants = [];
    for (let i = 0; i < this.groupRoleInfo.length ; i++) {
      let groupRole = this.groupRoleInfo[i];
      if (groupRole['role'] === this.selectedRole.role && this.tenants.indexOf(groupRole['tenant']) === -1) {
        this.tenants.push(groupRole['tenant']);
      }
    }
  }

  onTenantChange(newTenant) {
    this.error = '';
    this.pos = [];
    for (let i = 0; i < this.groupRoleInfo.length ; i++) {
      let groupRole = this.groupRoleInfo[i];
      if (groupRole['tenant'] === newTenant && groupRole['role'] === this.selectedRole.role) {
        this.pos.push(groupRole['pos']);
      }
    }
  }

  isValid() {
    return false;
  }

  onAddRole() {
    console.log('Adding role');
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
          console.log(role);
          this.error = '';
          this.selectedRoles.push(role);
          break;
      }
    }
  }

  onSubmit() {
    this.roleRequest.requestedRoles = new Array();
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.roleRequest.userId = currentUser.user_id;
    this.roleRequest.managerEmail = currentUser.manager_email;
    this.roleRequest.userName = currentUser.user_name;
    this.roleRequest.userEmail = currentUser.user_email;
    this.roleRequest.requestedRoles = this.selectedRoles;
    this.userService.submitRoleRequest(this.roleRequest).then(response => {
    });
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
