import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ChannelsConfigurationComponent } from './components/channels-configuration/channels-configuration.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'channel/:id', component: ChannelsConfigurationComponent },
];
