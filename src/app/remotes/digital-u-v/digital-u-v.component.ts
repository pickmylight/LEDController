import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { CommandModel } from 'src/app/models/command-model';
import { RemoteMqtt, RemoteTypes } from 'src/app/models/remote-model';
import { RemoteServiceService } from 'src/app/services/remote-service.service';

@Component({
    selector: 'app-digital-u-v',
    templateUrl: './digital-u-v.component.html',
    styleUrls: ['./digital-u-v.component.scss']
})
export class DigitalUVComponent implements OnInit, OnDestroy {
    public controller: RemoteMqtt;
    public isAlive = false;
    private source = interval(10000);
    constructor(
        private readonly remoteService: RemoteServiceService,
    ) { }

    ngOnInit(): void {
        this.remoteService.registeredRemotes.subscribe(remotes => {
            this.controller = remotes.find(remote => remote.remoteType === RemoteTypes.digitalUV);
            if (this.controller === undefined){
                this.controller = {
                    remoteUrl: '',
                    remoteType: RemoteTypes.digitalUV,
                    remoteChannel: ''
                };
                console.log(this.controller);
            } else {
                this.testConnection();
            }
        });
        this.remoteService.isAlive.subscribe(alive => {
            this.isAlive = alive;
        });
        this.source.subscribe(val => {
            this.testConnection();
        });
    }

    ngOnDestroy(): void {
        this.remoteService.unsubscribe();
    }

    public testConnection(): void {
        this.remoteService.subscribeAlive(this.controller);
    }

    public saveController(): void {
        this.remoteService.saveRemoteUrl(this.controller);
        this.testConnection();
    }

    public sendCommand(command: CommandModel): void {
        this.remoteService.sendCommand(command, this.controller);
    }
}
