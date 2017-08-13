import { Component, OnInit } from '@angular/core';
import { SpinnerService } from "./services/spinner.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
    showLoader: boolean;

    constructor(
        private spinnerService: SpinnerService,
    ) {}

    ngOnInit(): void {
        this.spinnerService.status.subscribe((val: boolean) => {
            this.showLoader = val;
        });
    }

}
