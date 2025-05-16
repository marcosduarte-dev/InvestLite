import { Routes } from "@angular/router";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { HomeComponent } from "./components/home/home.component";

export const routes: Routes = [
  { path: ``, component: HomeComponent },
  { path: `dashboard`, component: DashboardComponent }
];
