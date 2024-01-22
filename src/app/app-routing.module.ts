import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { StationComponent } from './pages/station/station.component';
import { MapPageComponent } from './pages/map-page/map-page.component';
import { AdminComponent } from './pages/admin/admin.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'map', component: MapPageComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'stations/:id', component: StationComponent },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
