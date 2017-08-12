import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login.component';
import { RegisterComponent } from './components/register.component';
import { HomeComponent } from './components/home.component';
import { UserInfoComponent } from './components/user-info.component'
import { AppRoutingModule }     from './app-routing.module';
import { FormsModule } from "@angular/forms";
import { LoginService } from "./services/login.service";
import { UserService } from "./services/user.service";
import { SpinnerService } from "./services/spinner.service";
import { HttpModule } from '@angular/http';
import { AuthModule } from "./http/auth.module";
import { AuthService } from "./services/auth.service";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    UserInfoComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    FormsModule,
    AuthModule,
  ],
  providers: [
    LoginService,
    UserService,
    AuthService,
    SpinnerService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
