import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from 'src/app/environments/environment';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { AdminComponent } from './pages/admin/admin.component';
import { HomeComponent } from './pages/home/home.component';
import { MapPageComponent } from './pages/map-page/map-page.component';
import { StationComponent } from './pages/station/station.component';
import { StatisticsComponent } from './pages/statistics/statistics.component';

let routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'map', component: MapPageComponent },
  { path: 'stats', component: StatisticsComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  { path: 'stations/:id', component: StationComponent },
  { path: 'login', component: LoginComponent },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

const comingSoonRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: '**',
    redirectTo: '/home',
    pathMatch: 'full'
  }
]

if (environment.comingSoon) {
  routes = comingSoonRoutes;
}

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
