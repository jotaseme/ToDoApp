import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Router } from "@angular/router";
import { Token } from "../models/token";

@Injectable()
export class AuthService {

    constructor(public router: Router,
                public http: Http) { }


    logout(): void {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    }
}
