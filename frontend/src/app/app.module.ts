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
import { TaskService } from "./services/task.service";
import { StatusService } from "./services/status.service";
import { SpinnerService } from "./services/spinner.service";
import { HttpModule } from '@angular/http';
import { AuthModule } from "./http/auth.module";
import { AuthService } from "./services/auth.service";
import { HttpCustom } from './http/custom.http';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    UserInfoComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    FormsModule,
    AuthModule,
    ToastModule.forRoot(),
    Ng2Bs3ModalModule,
  ],
  providers: [
    LoginService,
    UserService,
    TaskService,
    StatusService,
    AuthService,
    SpinnerService,
    HttpCustom,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
