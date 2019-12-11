export interface IBusbarSection {
    busbarSectionInstanceId?: number;
    elementPerProjectStageInstanceId?: number;
    busbarSectionName?: string;
    shortCircuitCapacity?: number;
    remove?: boolean;
}

export class BusbarSection implements IBusbarSection {
    constructor() { }
}
