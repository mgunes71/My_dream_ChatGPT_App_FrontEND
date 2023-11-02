import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {HttpTokenInterceptor} from "./interceptors/http.token.interceptor";
import {HttpErrorInterceptor} from "./interceptors/http-error.interceptor";
import {SocketModule} from "./modules/socket/socket.module";
import {BaseComponent} from "./components/base.component";



@NgModule({
  declarations: [BaseComponent],
  imports: [
    CommonModule,
    SocketModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true
    },
    {
      provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true
    }
  ]
})
export class CoreModule { }
