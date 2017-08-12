import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { LoginService } from "../services/login.service";
import { User } from "../models/user";
import { UserService } from "../services/user.service";
import { Token } from "../models/token";
import {AuthService} from "../services/auth.service";
import {SpinnerService} from "../services/spinner.service";

@Component({
    selector: 'login',
    templateUrl: '../views/login.html'
})

export class LoginComponent implements OnInit{
    private user: User = new User();
    private error: string = '';
    constructor(
        private router: Router,
        private loginService: LoginService,
        private userService: UserService,
        private authService: AuthService,
        private spinnerService: SpinnerService
    ){ }

    ngOnInit(): void {
        console.log("LOGIN");
        this.redirectHome();
    }

    login(){
        this.error = '';
        this.spinnerService.display(true);
        this.loginService.login(this.user.username, this.user.password)
            .then(token => {
                this.setToken(token);
                this.userService.getUser()
                    .then(res => {
                        this.spinnerService.display(false);
                        this.setUser(res);
                        this.redirectHome();
                    })
                    .catch();
            })
            .catch(err => {
                if (err.status == 401) {
                    this.spinnerService.display(false);
                    this.error = 'Usuario o contraseña incorrecto';
                }
            });
    }

    setUser(user: User) {
        localStorage.setItem('user', JSON.stringify(user));
    }

    setToken(token: Token){
        localStorage.setItem('token', token.token);
    }

    redirectHome(){
        if(this.authService.isLoggedIn()){
            console.log("LOGIN");
            this.router.navigate(['/']);
        }
    }
}