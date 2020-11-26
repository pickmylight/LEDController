import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CommandModel } from '../models/command-model';
import { RemoteModel, RemoteTest } from '../models/remote-model';
import { findLocalDevices } from 'local-devices/src/parser/index.js';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { convertTypeAcquisitionFromJson } from 'typescript';

@Injectable({
    providedIn: 'root'
})
export class RemoteServiceService {
    private readonly commandSource = new BehaviorSubject<CommandModel>({} as CommandModel);
    public currentCommand = this.commandSource.asObservable();
    private readonly remoteSource = new BehaviorSubject<RemoteModel[]>([] as RemoteModel[]);
    public registeredRemotes = this.remoteSource.asObservable();
    constructor(
        private readonly http: HttpClient,
        private readonly dbService: NgxIndexedDBService
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

    private updateRemoteModel(remotes: RemoteModel[]): void {
        this.remoteSource.next(remotes);
    }

    private updateCommand(command: CommandModel): void {
        this.commandSource.next(command);
    }

    public postCommand(command: CommandModel, endpoint: string): Promise<CommandModel> {
        this.updateCommand(command);
        return this.http.post<CommandModel>(endpoint + '/command', command).toPromise();
    }

    public testRemote(endpoint: string): Promise<RemoteTest> {
        return this.http.get<RemoteTest>(endpoint + '/check').toPromise();
    }

    public saveRemoteUrl(remoteSet: RemoteModel): void {
        this.dbService.getByIndex('remotes', 'remoteType', remoteSet.remoteType).subscribe((remotes) => {
            if (remotes === undefined) {
                this.dbService.add('remotes', remoteSet);
            } else {
                this.dbService.update('remotes', {
                    id: remotes.id,
                    remoteUrl: remoteSet.remoteUrl,
                    remoteType: remoteSet.remoteType
                });
            }
        });
        this.getRemotes();
    }
}
