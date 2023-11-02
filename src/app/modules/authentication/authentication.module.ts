import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthenticationRoutingRoutingModule} from "./authentication-routing-routing.module";
import {SharedModule} from "../../shared/shared.module";
import {SignInComponent} from "./pages/sign-in/sign-in.component";
import {SignUpComponent} from "./pages/sign-up/sign-up.component";
import {AuthenticationComponent} from "./authentication.component";

const declarations = [
  AuthenticationComponent,
  SignInComponent,
  SignUpComponent,
]

@NgModule({
  declarations: [...declarations],
  imports: [
    CommonModule,
    AuthenticationRoutingRoutingModule,
    SharedModule
  ]
})
export class AuthenticationModule { }
