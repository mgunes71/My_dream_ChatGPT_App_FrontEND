import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ConfirmationModalComponent} from "./modals/confirmation-modal/confirmation-modal.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ToastrModule} from "ngx-toastr";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

const declarations = [
  ConfirmationModalComponent,

];

const modules = [
  ReactiveFormsModule,
  FormsModule,
  NgbModule
]

@NgModule({
  declarations: [...declarations],
  imports: [
    CommonModule,
      ...modules
  ],
  exports: [ToastrModule,  ...modules, ...declarations]
})
export class UiKitModule { }
