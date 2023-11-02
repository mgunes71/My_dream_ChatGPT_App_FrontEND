import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LayoutComponent} from "./components/layout/layout.component";
import {HeaderComponent} from "./components/header/header.component";
import {FooterComponent} from "./components/footer/footer.component";
import {HttpClientModule} from "@angular/common/http";
import {TruncatePipe} from "./pipes/truncate.pipe";
import {MomentPipe} from './pipes/moment.pipe';
import {UiKitModule} from "./modules/ui-kit/ui-kit.module";
import {ToastrModule} from "ngx-toastr";


const declarations = [
  LayoutComponent,
  HeaderComponent,
  FooterComponent,
  TruncatePipe,
  MomentPipe,
]

const modules = [
  CommonModule,
  RouterModule,
  HttpClientModule,
  FormsModule,
  ReactiveFormsModule,
  UiKitModule,
]

@NgModule({
  declarations: [...declarations],
  imports: [
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    ...modules],
  exports: [...modules, ...declarations]
})
export class SharedModule {
}
