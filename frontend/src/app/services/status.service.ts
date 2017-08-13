import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import { Router } from "@angular/router";
import { AuthHttp} from "angular2-jwt";
import { HttpCustom } from "../http/custom.http";
import { Http } from "@angular/http";
import { Status } from "../models/status";

@Injectable()
export class StatusService {
    private taskUrl = 'http://localhost:8000/api/v1/';
    constructor(
        public router: Router,
        public httpCustom: HttpCustom,
        public http: Http) { }

    getStatus():Promise<Status[]>{
        return this.httpCustom
            .get(this.taskUrl+'status')
            .toPromise()
            .then(res => res.json() as Status[])
            .catch(error => {
                return Promise.reject(error)
            });
    }
}
