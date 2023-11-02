import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {DreamComponent} from "./dream.component";
import {DreamListComponent} from "./pages/dream-list/dream-list.component";
import {DreamDetailsComponent} from "./pages/dream-details/dream-details.component";
import {AddDreamComponent} from "./pages/add-dream/add-dream.component";

const routes: Routes = [
  {
    path: '',
    component: DreamComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: DreamListComponent
      },
      {
        path: 'list/:id',
        component: DreamDetailsComponent
      },
      {
        path: 'add',
        component: AddDreamComponent
      }
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class DreamRoutingModule { }
