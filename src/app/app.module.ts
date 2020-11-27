import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RemotesComponent } from './remotes/remotes/remotes.component';
import { DigitalUVComponent } from './remotes/digital-u-v/digital-u-v.component';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NoRemoteComponent } from './remotes/no-remote/no-remote.component';
import { HttpClientModule } from '@angular/common/http';
import { DigitalSimpleComponent } from './remotes/digital-simple/digital-simple.component';
import { FormsModule } from '@angular/forms';
import { DBConfig, NgxIndexedDBModule } from 'ngx-indexed-db';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { IMqttServiceOptions, MqttModule } from 'ngx-mqtt';
import { SettingsComponent } from './settings/settings.component';

const dbConfig: DBConfig  = {
    name: 'Database',
    version: 1,
    objectStoresMeta: [{
      store: 'remotes',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'remoteUrl', keypath: 'remoteUrl', options: { unique: false } },
        { name: 'remoteType', keypath: 'remoteType', options: { unique: false } }
      ]
    }]
  };

const mqttConfig: IMqttServiceOptions = {
    hostname: environment.mqtt.server,
    port: environment.mqtt.port,
    protocol: (environment.mqtt.protocol === 'wss') ? 'wss' : 'ws',
    path: '',
    connectOnCreate: true,
    clientId: 'helloApp'
};

@NgModule({
  declarations: [
    AppComponent,
    RemotesComponent,
    DigitalUVComponent,
    NoRemoteComponent,
    DigitalSimpleComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    NgxIndexedDBModule.forRoot(dbConfig),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    MqttModule.forRoot(mqttConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
