import { Observable } from 'rxjs/Rx';
import { Headers, Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
    public token: string;

    constructor(private http: Http) {
        // set token if saved in local storage
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.id_token;
    }

    login(username, password): Observable<boolean> {
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        return this.http.post('http://localhost:8080/api/authenticate',
        JSON.stringify({ username: username, password: password }), { headers: headers})
            .map(response => {
                console.log('Got this');
                console.log(response);
                if (response.status === 200) {
                    console.log('Success');
                    // login successful if there's a jwt token in the response
                    let token = response.json() && response.json().id_token;
                    // set token property
                    this.token = token;
                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    // localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
                    localStorage.setItem('currentUser', JSON.stringify(response.json()));
                    // return true to indicate successful login
                    return true;
                }
                // return false to indicate failed login
                return false;
            }).catch(this.handleError);
    }

    private handleError (error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg = 'Invalid UserName/Password';
        return Observable.throw(errMsg);
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
    }
}
