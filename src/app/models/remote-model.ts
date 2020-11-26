export interface RemoteModel {
    remoteUrl: string;
    remoteType: RemoteTypes;
}

export interface RemoteTest {
    isAlive: boolean;
    timestamp: Date;
}

export enum RemoteTypes {
    digitalUV = 'digitalUV',
    digitalSimple = 'digitalSimple'
}
