export interface IAssetRequestParameter {
    requirementId?: number;
    busbarName?: string;
    busbarInstanceId?: number;
    recordType?: string;
    substationInstanceId?: number;
    substationName?: string;
    elementMRID?: number;
    elementinstanceid?: number;
    elementType?: string;
    codigoAgenteODS?: number;
    nombreAgente?: string;
}

export class AssetRequestParameter implements IAssetRequestParameter {
    constructor() { }
}
