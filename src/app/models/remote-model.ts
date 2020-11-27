export enum RemoteTypes {
    digitalUV = 'digitalUV',
    digitalSimple = 'digitalSimple'
}

export interface RemoteMqtt {
    remoteChannel: string;
    remoteType: RemoteTypes;
    remoteUrl: string;
}
