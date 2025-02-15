import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ChannelsConfigurationComponent } from './components/channels-configuration/channels-configuration.component';
import { ChannelListComponent } from './components/channel-list/channel-list.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'channels', component: ChannelListComponent },
    { path: 'channels/:id', component: ChannelsConfigurationComponent },
];
