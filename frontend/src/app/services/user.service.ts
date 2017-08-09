import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Router } from "@angular/router";
import { AuthHttp} from "angular2-jwt";
import { User } from "../models/user";

@Injectable()
export class UserService {
    private userUrl = 'http://localhost:8000/api/v1/user/authenticated';
    constructor(
        public router: Router,
        public http: Http,
        public authHttp: AuthHttp) { }

    getUser(): Promise<User> {
        return this.authHttp.get(this.userUrl)
            .toPromise()
            .then(response =>  {
                return response.json() as User
            });
    }
}
