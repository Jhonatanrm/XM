export interface IRequirement {
    idRequerimiento?: number;
    requestTypeID?: number;
    tipo?: string;
    requestID?: number;
    solicitud?: string;
    elementoProyecto?: string;
    agentePromotor?: string;
    fechaEnvio?: string;
    fechaPendiente?: string;
    diasRestantes?: number;
    stateID?: number;
    estado?: string;
    versionComments?: string;
    userName?: string;
    recordType?: string;
}

export interface IRequirements {
    items?: IRequirement[]; // Array<IRequirement>
    metadata?: any;
    sortedBy?: any;
}