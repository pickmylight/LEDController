import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DigitalSimpleComponent } from './remotes/digital-simple/digital-simple.component';
import { DigitalUVComponent } from './remotes/digital-u-v/digital-u-v.component';
import { NoRemoteComponent } from './remotes/no-remote/no-remote.component';
import { RemotesComponent } from './remotes/remotes/remotes.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
    {
        path: 'remotes', component: RemotesComponent, children: [
            {
                path: 'digital/uv', component: DigitalUVComponent
            },
            {
                path: 'digital/simple', component: DigitalSimpleComponent
            },
            {
                path: '**', component: DigitalUVComponent
            }
        ]
    },
    { path: 'settings', component: SettingsComponent},
    { path: '**', redirectTo: '/remotes'}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
