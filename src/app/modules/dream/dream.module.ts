import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DreamComponent} from "./dream.component";
import {DreamRoutingModule} from "./dream-routing.module";
import {DreamListComponent} from "./pages/dream-list/dream-list.component";
import {SharedModule} from "../../shared/shared.module";
import {DreamDetailsComponent} from "./pages/dream-details/dream-details.component";
import {AddDreamComponent} from "./pages/add-dream/add-dream.component";



@NgModule({
  declarations: [
    DreamComponent,
    DreamListComponent,
    DreamDetailsComponent,
    AddDreamComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DreamRoutingModule
  ],
})
export class DreamModule { }
