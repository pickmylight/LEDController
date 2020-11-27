import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { CommandModel } from '../models/command-model';
import { RemoteMqtt } from '../models/remote-model';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { IMqttMessage, MqttService } from 'ngx-mqtt';

@Injectable({
    providedIn: 'root'
})
export class RemoteServiceService {
    private readonly commandSource = new BehaviorSubject<CommandModel>({} as CommandModel);
    public currentCommand = this.commandSource.asObservable();
    private readonly remoteSource = new BehaviorSubject<RemoteMqtt[]>([] as RemoteMqtt[]);
    public registeredRemotes = this.remoteSource.asObservable();
    private readonly isAliveSource = new BehaviorSubject<boolean>(false);
    private subscription: Subscription;
    public isAlive = this.isAliveSource.asObservable();
    private lastTime: number;
    constructor(
        private readonly dbService: NgxIndexedDBService,
        private readonly mqttService: MqttService
    ) {
        this.getRemotes();
    }

    public getRemotes(): void {
        this.dbService.getAll('remotes').subscribe((remotes) => {
            if (remotes !== undefined) {
                this.updateRemoteModel(remotes);
            }
        });
    }

    private updateRemoteModel(remotes: RemoteMqtt[]): void {
        this.remoteSource.next(remotes);
    }

    private updateCommand(command: CommandModel): void {
        this.commandSource.next(command);
    }

    public sendCommand(command: CommandModel, remote: RemoteMqtt): void {
        this.mqttService.unsafePublish('/schmidtcloud.ddnss.de' + remote.remoteChannel, Buffer.from(command.command));
    }

    public subscribeAlive(remote: RemoteMqtt): void {
        this.mqttService.unsafePublish('/schmidtcloud.ddnss.de' + remote.remoteChannel, Buffer.from('alive'));
        this.subscription = this.mqttService.observe('/schmidtcloud.ddnss.de/isAlive').subscribe((message: IMqttMessage) => {
            this.isAliveSource.next(true);
            this.lastTime =  +message.payload.toString();
        });
        if ((Date.now() / 1000 - this.lastTime) >= 11.5){
            this.isAliveSource.next(false);
        }
    }

    public unsubscribe(): void {
        try {
            this.subscription.unsubscribe();
            this.isAliveSource.next(false);
        } catch (error) {
            console.log(error);
        }
    }

    public saveRemoteUrl(remoteSet: RemoteMqtt): void {
        this.dbService.getByIndex('remotes', 'remoteType', remoteSet.remoteType).subscribe((remotes) => {
            if (remotes === undefined) {
                this.dbService.add('remotes', remoteSet);
            } else {
                this.dbService.update('remotes', {
                    id: remotes.id,
                    remoteUrl: remoteSet.remoteUrl,
                    remoteType: remoteSet.remoteType,
                    remoteChannel: remoteSet.remoteChannel
                });
            }
        });
        this.getRemotes();
    }
}
