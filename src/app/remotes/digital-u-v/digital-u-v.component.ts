import { Component, OnInit } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { CommandModel } from 'src/app/models/command-model';
import { RemoteModel, RemoteTypes } from 'src/app/models/remote-model';
import { RemoteServiceService } from 'src/app/services/remote-service.service';

@Component({
    selector: 'app-digital-u-v',
    templateUrl: './digital-u-v.component.html',
    styleUrls: ['./digital-u-v.component.scss']
})
export class DigitalUVComponent implements OnInit {
    public controller: RemoteModel;
    public isTested = false;
    constructor(
        private readonly remoteService: RemoteServiceService,
    ) { }

    ngOnInit(): void {
        this.remoteService.registeredRemotes.subscribe(remotes => {
            this.controller = remotes.find(remote => remote.remoteType === 'digitalUV');
            if (this.controller === undefined){
                this.controller = {
                    remoteUrl: '',
                    remoteType: RemoteTypes.digitalUV
                };
            } else {
                this.testConnection();
            }
        });
    }

    private testConnection(): void {
        this.remoteService.testRemote(this.controller.remoteUrl).then(ret => {
            this.isTested = true;
            console.log(ret);
        });
    }

    public saveController(): void {
        this.remoteService.saveRemoteUrl(this.controller);
        this.testConnection();
    }

    public sendCommand(command: CommandModel): void {
        this.remoteService.postCommand(command, this.controller.remoteUrl).then(cmd => {
            console.log(cmd);
            // do something with it!
        });
    }
}
