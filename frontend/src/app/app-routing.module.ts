import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login.component';
import { RegisterComponent } from './components/register.component';
import  { AuthService } from "./services/auth.service";
import { HomeComponent } from "./components/home.component";



const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthService] },
    { path: 'login',  component: LoginComponent },
    { path: 'register', component: RegisterComponent },
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}