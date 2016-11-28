import { RoleRequest } from './_models/role-request';
import { Headers, Http } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {

    getGroupRoleMap(): Promise<any> {
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        return this.http.get('http://localhost:8080/api/grouprole', {headers: headers})
               .toPromise()
               .then(response => response.json() as any)
               .catch(this.handleError);
    }

    getUserInfo(): Promise<any> {
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        headers.append('Authorization', 'Bearer ' + currentUser.token);
        return this.http.get('http://localhost:8080/api/account', {headers: headers})
               .toPromise()
               .then(response => response.json() as any)
               .catch(this.handleError);
    }

    submitRoleRequest(roleRequest: RoleRequest): Promise<any> {
        let headers = new Headers();
       headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        headers.append('Authorization', 'Bearer ' + currentUser.token);
        return this.http.post('http://localhost:8080/api/requestrole', roleRequest, {headers: headers})
              .toPromise()
              .then(response => response.json as any)
              .catch(this.handleError);
    }

    private handleError(error: Error): Promise<any> {
        console.error('An error occured', error);
        return Promise.reject(error.message || error);
    }

  constructor(private http: Http) { }

}
