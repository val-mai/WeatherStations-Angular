import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { StationComponent } from './pages/station/station.component';
import { MapPageComponent } from './pages/map-page/map-page.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AdminDeviceComponent } from './pages/admin-device/admin-device.component';
import { environment } from 'src/app/environments/environment';
import { AuthGuard } from './auth/auth.guard';

let routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'map', component: MapPageComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  { path: 'edit/:id', component: AdminDeviceComponent, canActivate: [AuthGuard] },
  { path: 'stations/:id', component: StationComponent },
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
