import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {UserComponent} from './user/user.component';
import {HomeComponent} from './home/home.component';
import {AppComponent} from './app.component';
import {PassphraseGuard} from './passphrase.guard';

const routes: Routes = [
  {
    path: '', component: AppComponent, children: [
      { path: '', component: HomeComponent },
      { path: 'dashboard', component: DashboardComponent, canActivate: [PassphraseGuard], children: [
          { path: 'user/:id', component: UserComponent }
        ]}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
