import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'register',
    templateUrl: '../views/register.html'
})

export class RegisterComponent implements OnInit{
    private title: string;

    constructor(){
        this.title = 'Register Component'
    }
    ngOnInit(): void {
        console.log(this.title);
    }

}
