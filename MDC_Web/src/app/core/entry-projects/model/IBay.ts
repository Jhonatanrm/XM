import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { GeneralList } from './IGeneralList';
export interface IBay {
    BayMRID?: number;  // PK
    BayInstanceId?: number;
    BayName?: string;
    BayCode?: string;
    SubstationMRID?: number; // FK
    OwnerAgent?: string;  // FK
    OperatingAgent?: string;  // FK
    BayEnergyMeasFlag?: number;
    BayPowerMeasFlag?: number;
    BreakerConfiguration?: number;  // FK
    BusbarConfiguration?: number;  // FK
    XMBayType?: number;  // FK
    XMFacilityKind?: number;   // FK
    RecordState?: number;
    XMIsSTNHerope?: number;
    XMIsSTRHerope?: number;
    XMIsSTNCommercial?: number;
    XMIsSTRCommercial?: number;
    XMIsConsignable?: number;
    UserName?: string;
    ValidFrom?: NgbDateStruct;
    ValidTo?: NgbDateStruct;
    VersionComments?: string;

    // Elementos
    GeneralLists?: GeneralList[];
}

export class Bay implements IBay {
    constructor() { }
}
