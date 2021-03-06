import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import { Router } from "@angular/router";
import { AuthHttp} from "angular2-jwt";
import { User } from "../models/user";
import { HttpCustom } from "../http/custom.http";
import { Http } from "@angular/http";

@Injectable()
export class UserService {
    private userUrl = 'http://localhost:8000/api/v1/';
    constructor(
        public router: Router,
        public httpCustom: HttpCustom,
        public authHttp: AuthHttp,
        public http: Http) { }

    getUser(): Promise<User> {
        return this.authHttp
            .get(this.userUrl+'user/authenticated')
            .toPromise()
            .then(response =>  {
                return response.json() as User
            });
    }

    postUser(user: User){
        return this.http
            .post(this.userUrl+'users',{user: user})
            .toPromise()
            .then(res => res.json() as User)
            .catch(error => {
                return Promise.reject(error)
            });
    }
}
