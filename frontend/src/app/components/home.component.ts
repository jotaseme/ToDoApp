import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { LoginService } from "../services/login.service";
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
import {Task} from "../models/task";
import {SpinnerService} from "../services/spinner.service";
import {TaskService} from "../services/task.service";
import {StatusService} from "../services/status.service";
import {Status} from "../models/status";
import {HttpCustom, HttpFormErrors} from "../http/custom.http";

@Component({
    selector: 'home',
    templateUrl: '../views/home.html'
})

export class HomeComponent implements OnInit{
    @ViewChild('addTaskModal')
    modal: ModalComponent;
    private task: Task = new Task();
    private allStatus:Status[];
    errors: HttpFormErrors = new HttpFormErrors();
    private tasks: Task[] = [];

    constructor(
        private spinnerService:SpinnerService,
        private taskService:TaskService,
        private statusService:StatusService,
        private http: HttpCustom,
    )
    {  }

    ngOnInit(): void {
        this.spinnerService.display(true);
        this.taskService.getTasks()
            .then(res=>{
                this.spinnerService.display(false);
                this.tasks = res;
            })
            .catch(err=>{
                this.spinnerService.display(false)
                ;console.log(err)
            });
        this.statusService.getStatus()
            .then(res=>{
                this.allStatus = res;
            })
            .catch(err=>{console.log(err)});
    }

    openTaskModal() {
        this.modal.open();
    }

    dismiss(){
        this.errors = new HttpFormErrors();
        this.task = new Task();
        this.modal.close();
    }

    addTask(){
        this.errors = new HttpFormErrors();
        this.spinnerService.display(true);
        this.taskService.postTask(this.task)
            .then(res => {
                this.spinnerService.display(false);
                this.tasks.push(res);
                this.modal.close();
                this.task = new Task();
            })
            .catch(res => {
                this.spinnerService.display(false);
                this.errors = this.http.handleError(res);
            });
    }
}
