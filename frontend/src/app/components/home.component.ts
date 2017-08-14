import { Component, OnInit, ViewChild } from '@angular/core';
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
import {Task} from "../models/task";
import {SpinnerService} from "../services/spinner.service";
import {TaskService} from "../services/task.service";
import {StatusService} from "../services/status.service";
import {Status} from "../models/status";
import {HttpCustom, HttpFormErrors} from "../http/custom.http";
import {Filter} from "../models/filter";

@Component({
    selector: 'home',
    templateUrl: '../views/home.html'
})

export class HomeComponent implements OnInit{
    @ViewChild('addTaskModal')
    modal: ModalComponent;

    @ViewChild('deleteTaskModal')
    modalDelete: ModalComponent;
    private filter:Filter = new Filter();

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
                console.log(err);
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
        if(this.task.id){
            this.editTask();
            return false;
        }
        this.errors = new HttpFormErrors();
        this.modal.close();
        this.spinnerService.display(true);
        this.taskService.postTask(this.task)
            .then(res => {
                this.spinnerService.display(false);
                this.tasks.push(res);

                this.task = new Task();
            })
            .catch(res => {
                this.spinnerService.display(false);
                this.errors = this.http.handleError(res);
            });
    }

    editTaskModal(task:Task){
        this.task = task;
        this.task.status_id = task.status.id;
        this.modal.open();
    }

    removeTaskModal(task:Task){
        this.task = task;
        this.modalDelete.open();
    }

    editTask(){
        this.errors = new HttpFormErrors();
        this.modal.close();
        this.spinnerService.display(true);
        this.taskService.editTask(this.task)
            .then(res => {
                this.spinnerService.display(false);
                this.task = new Task();
            })
            .catch(res => {
                this.spinnerService.display(false);
                this.errors = this.http.handleError(res);
            });
    }

    deleteTask(){
        this.spinnerService.display(true);
        this.taskService.deleteTask(this.task)
            .then(res => {
                this.tasks.splice(this.tasks.indexOf(this.task),1);
                this.spinnerService.display(false);
                this.task = new Task();
            })
            .catch(res => {
                this.spinnerService.display(false);
                this.errors = this.http.handleError(res);
            });
    }

    search(event):void{
        this.tasks = event.tasks;
    }
}
