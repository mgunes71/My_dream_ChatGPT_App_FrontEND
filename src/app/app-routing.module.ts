import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LayoutComponent} from "./shared/components/layout/layout.component";
import {AuthGuard} from "./modules/authentication/guards/auth.guard";

const routes: Routes = [
  {
    path: 'authentication',
    loadChildren: () => import('./modules/authentication/authentication.module').then(m => m.AuthenticationModule)
  },

  {
    path: '',
    redirectTo: 'dream',
    pathMatch: 'full'
  },

  {
    path: '',
    component: LayoutComponent,
    children: [

      {
        path: 'dream',
        loadChildren: () => import('./modules/dream/dream.module').then(m => m.DreamModule)
      },
    ],
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
