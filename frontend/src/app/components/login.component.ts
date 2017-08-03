import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'login',
    templateUrl: '../views/login.html'
})

export class LoginComponent implements OnInit{
    private title: string;

    constructor(){
        this.title = 'Login Component'
    }
    ngOnInit(): void {
        console.log(this.title);
    }

}