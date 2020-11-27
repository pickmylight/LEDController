import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RemoteMqtt, RemoteTypes } from '../models/remote-model';
import { RemoteServiceService } from '../services/remote-service.service';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
    public remotes: RemoteMqtt[];
    public newRemote: RemoteMqtt;
    public isTested = false;
    public types = Object.keys;
    public remoteTypes = RemoteTypes;
    constructor(
        private readonly remoteService: RemoteServiceService
    ) { }

    ngOnInit(): void {
        this.newRemote = {
            remoteChannel: '',
            remoteType: RemoteTypes.digitalUV,
            remoteUrl: environment.mqtt.server,
        };
        this.remoteService.registeredRemotes.subscribe(remotes => {
            this.remotes = remotes;
            console.log(remotes);
        });
    }

    public saveSet(remote: RemoteMqtt): void {
        this.remoteService.saveRemoteUrl(remote);
    }
}
