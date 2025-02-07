import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    /*
    { path: 'dashboard', component: DashboardComponent },
    { path: 'channel/:id', component: ChannelsConfigurationComponent },
    { path: 'counter', component: CounterComponent },
    { path: 'fetch-data', component: FetchDataComponent },
     */
];
