import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { LoginService } from "../services/login.service";
import { User } from "../models/user";
import { UserService } from "../services/user.service";
import { tokenNotExpired } from "angular2-jwt";
import {Token} from "../models/token";

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
    ){ }

    ngOnInit(): void {
        this.redirectHome();
    }

    login(){
        this.error = '';
        this.loginService.login(this.user.username, this.user.password)
            .then(token => {
                this.setToken(token);
                this.userService.getUser()
                    .then(res => {
                        this.setUser(res);
                        this.redirectHome();
                    })
                    .catch();
            })
            .catch(err => {
                if (err.status == 401) {
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
        if(this.isLogged()){
            this.router.navigate(['/']);
        }
    }

    isLogged() {
        if (!localStorage.getItem('user')){
            return false;
        }
        return tokenNotExpired();
    }
}