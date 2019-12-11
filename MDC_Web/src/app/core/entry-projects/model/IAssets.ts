export interface IAssets {
    recordType?: string;
    complete?: boolean;
    elementId?: number;
    assetName?: string;
    assetCode?: string;
    assetId?: number;
    operatingAgentName?: string;
    parentAssetId?: number;
    parentAssetName?: string;
    parentAssetCode?: string;
    stageProjectId?: number;
    version?: string;
    assetType?: string;
    etapasShowColumn?: string;
}

export class Assets implements IAssets {
    constructor() { }
}
