import { CanActivate } from "@angular/router";
import { Injectable } from '@angular/core';
import { LoginService } from "./login.service";
import {tokenNotExpired} from "angular2-jwt";


@Injectable()
export class AuthService implements CanActivate {

    constructor(private loginService: LoginService) {}

    canActivate() {
        console.log("canActivate");
        return this.isLoggedIn();
    }

    isLoggedIn(){
        if (localStorage.getItem('user') && tokenNotExpired()){
            return true;
        }
        //this.loginService.logout();
        return tokenNotExpired();
    }

    logout(){
        this.loginService.logout();
    }

    getUser(){
        if(!this.isLoggedIn()){
            return false;
        }
        return JSON.parse(localStorage.getItem('user'));
    }
}
