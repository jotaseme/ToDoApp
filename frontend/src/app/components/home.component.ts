import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { LoginService } from "../services/login.service";
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
import {Task} from "../models/task";
import {SpinnerService} from "../services/spinner.service";
import {TaskService} from "../services/task.service";

@Component({
    selector: 'home',
    templateUrl: '../views/home.html'
})

export class HomeComponent implements OnInit{
    @ViewChild('addTaskModal')
    modal: ModalComponent;
    private task: Task = new Task();

    constructor(
        private spinnerService:SpinnerService,
        private taskService:TaskService,
    )
    {  }

    ngOnInit(): void {
        console.log("HOME");
    }

    openTaskModal() {
        this.modal.open();
    }

    dismiss(){
        this.task = new Task();
        this.modal.close();
    }

    addTask(){
        console.log(this.task);
        this.spinnerService.display(true);

        this.taskService.postTask(this.task)
            .then(res => {
                this.spinnerService.display(false);
            })
            .catch(res => {
                //this.errors = this.http.handleError(res);
                this.spinnerService.display(false);
            });
    }
}
