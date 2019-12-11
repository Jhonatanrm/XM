export interface IServiceSend {
    xmApiConnectionMrid?: number;
    enabledApi?: boolean;
}

export interface IService extends IServiceSend {
    atomicApiName?: string;
}
