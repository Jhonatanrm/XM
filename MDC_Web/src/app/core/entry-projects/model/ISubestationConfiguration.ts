import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

export interface ISubestationConfiguration {
    substationConfigurationMRID?: number;
    substationConfigurationInstanceId?: number;
    substationMRID?: number; // FK subestacion
    voltageLevelKind?: number; // Nivel de tension
    shortCircuitCapacity?: number; // Capacidad de Corto circuito
    substationConfigurationKind?: string;
    unifilarDiagram?: string;
    validFrom?: NgbDateStruct;
    validTo?: NgbDateStruct;
    versionComments?: string;
    userName?: string;
}

export class SubestationConfiguration implements ISubestationConfiguration {
    constructor() { }
}


