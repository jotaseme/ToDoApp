import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Router } from "@angular/router";
import { Token } from "../models/token";

@Injectable()
export class LoginService {
    private userLoginUrl = 'http://localhost:8000/api/v1/login_check';
    constructor(public router: Router,
                public http: Http) { }

    login(username: string, password: string): Promise<Token> {
        return this.http.post(this.userLoginUrl, {'_username': username, '_password': password})
            .toPromise()
            .then(response =>  {
                return response.json() as Token
            });
    }


    logout(): void {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    }
}
