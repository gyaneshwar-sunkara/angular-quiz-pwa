import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { GenericNotFoundComponent } from './components/generic-not-found/generic-not-found.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InstructionsComponent } from './components/instructions/instructions.component';
import { AboutComponent } from './components/about/about.component';

import { AuthGuard } from './guards/auth.guard';
import { UserGuard } from './guards/user.guard';

const routes: Routes = [
  { path: '', component: SigninComponent, canActivate: [UserGuard] },
  { path: 'signup', component: SignupComponent, canActivate: [UserGuard] },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'instructions',
    component: InstructionsComponent,
    canActivate: [AuthGuard],
  },
  { path: 'about', component: AboutComponent },
  { path: '404', component: GenericNotFoundComponent },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
