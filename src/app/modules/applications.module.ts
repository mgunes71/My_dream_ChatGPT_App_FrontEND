import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthenticationModule} from "./authentication/authentication.module";
import {DreamModule} from "./dream/dream.module";
import {SharedModule} from "../shared/shared.module";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthenticationModule,
    DreamModule,
    SharedModule
  ]
})
export class ApplicationsModule { }
