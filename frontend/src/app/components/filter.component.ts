import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { TaskService } from "../services/task.service";
import { Filter } from "../models/filter";
import { Status } from "../models/status";

@Component({
    selector: 'task-filter',
    templateUrl: '../views/filter.html'
})

export class FilterComponent implements OnInit{
    private filter:Filter = new Filter();
    @Input() allStatus: Status[];
    @Output() tasksEvent = new EventEmitter();

    timeSearch: any;

    constructor(
        private taskService:TaskService,
    )
    {  }

    ngOnInit(): void {
    }

    search(){
        if (this.timeSearch){clearTimeout(this.timeSearch);}
        this.timeSearch = setTimeout(() => {
            this.taskService.getTasks(this.filter)
                .then(tasks => {
                    this.tasksEvent.emit({tasks:tasks});
                })
                .catch();
        },200);
    }
}
