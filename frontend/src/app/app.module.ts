import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login.component';
import { RegisterComponent } from './components/register.component';
import { AppRoutingModule }     from './app-routing.module';
import { FormsModule } from "@angular/forms";
import { LoginService } from "./services/login.service";
import { UserService } from "./services/user.service";
import { HttpModule } from '@angular/http';
import {AuthModule} from "./http/auth.module";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
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
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
