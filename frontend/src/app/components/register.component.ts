import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {User} from "../models/user";
import {SpinnerService} from "../services/spinner.service";
import {UserService} from "../services/user.service";
import {HttpCustom, HttpFormErrors} from "../http/custom.http";

@Component({
    selector: 'register',
    templateUrl: '../views/register.html'
})

export class RegisterComponent implements OnInit{
    private title: string;
    errors: HttpFormErrors = new HttpFormErrors();
    private success: string;
    private user: User = new User();

    constructor(
        private spinnerService: SpinnerService,
        private userservice: UserService,
        private router: Router,
        private http: HttpCustom,
    ){
        this.title = 'Register Component'
    }
    ngOnInit(): void {
        console.log(this.title);
    }

    register(){
        this.errors = new HttpFormErrors();
        this.spinnerService.display(true);

        this.userservice.postUser(this.user)
            .then(res => {
                this.success = 'Ahora introduce tus credenciales en el login';
                this.spinnerService.display(false);
                this.router.navigate(['/login']);
            })
            .catch(res => {
                this.errors = this.http.handleError(res);
                this.spinnerService.display(false);
            });
    }

}
