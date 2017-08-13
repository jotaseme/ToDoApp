import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth.service";

@Component({
    selector: 'user-info',
    templateUrl: '../views/user-info.html'
})

export class UserInfoComponent implements OnInit{
    private title: string;

    constructor(private authService: AuthService){
        this.title = 'User info Component'
    }

    getUser(){
        return this.authService.getUser();
    }

    logout(){
        this.authService.logout();
    }

    ngOnInit(): void {
    }
}
