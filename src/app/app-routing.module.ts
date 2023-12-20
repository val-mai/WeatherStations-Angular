import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { StationComponent } from './pages/station/station.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'stations/:id', component: StationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
