import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import { Router } from "@angular/router";
import { AuthHttp} from "angular2-jwt";
import { HttpCustom } from "../http/custom.http";
import { Http } from "@angular/http";
import {Task} from "../models/task";
import {Filter} from "../models/filter";

@Injectable()
export class TaskService {
    private taskUrl = 'http://localhost:8000/api/v1/tasks';
    constructor(
        public router: Router,
        public httpCustom: HttpCustom,
        public authHttp: AuthHttp,
        public http: Http) { }

    postTask(task: Task):Promise<Task>{
        return this.httpCustom
            .post(this.taskUrl+'tasks',{task: task})
            .toPromise()
            .then(res => res.json() as Task)
            .catch(error => {
                return Promise.reject(error)
            });
    }

    editTask(task: Task):Promise<Task>{
        return this.httpCustom
            .patch(this.taskUrl+'tasks/'+task.id,{task: task})
            .toPromise()
            .then(res => res.json() as Task)
            .catch(error => {
                return Promise.reject(error)
            });
    }

    getTasks(filter:Filter = null):Promise<Task[]>{
        return this.httpCustom
            .get(this.taskUrl, {search: this.httpCustom.getURLSearchParams('filter', filter) })
            .toPromise()
            .then(res => res.json() as Task[])
            .catch(error => {
                return Promise.reject(error)
            });
    }

    deleteTask(task: Task){
        return this.httpCustom
            .delete(this.taskUrl+'tasks/'+task.id)
            .toPromise()
            .then()
            .catch(error => {
                return Promise.reject(error)
            });
    }

}
