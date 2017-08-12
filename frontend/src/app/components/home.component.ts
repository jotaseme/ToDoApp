import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {LoginService} from "../services/login.service";

@Component({
    selector: 'home',
    templateUrl: '../views/home.html'
})

export class HomeComponent implements OnInit{
    private title: string;
    private loginService:LoginService;
    private router:Router;
    constructor(){
        this.title = 'Home Component'
    }
    ngOnInit(): void {
        console.log("HOME");
    }

}
