import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

export interface IStagePerProject {
    StageProjectRID?: number;
    ProjectRID?: number; // Foranea a IProject
    StageProjectInstanceId?: number;
    StageOrder?: number;  // valor: 1,  cuales son los posibles valores
    StageDescription?: string;
    FpoDate?: NgbDateStruct;
    ValidFrom?: NgbDateStruct;
    ValidTo?: NgbDateStruct;
    VersionComments?: string;
    UserName?: string;
    id?: number;
    stageOrder?: number;

    fpoDate?: string;
    stageDescription?: string;
}

export class StagePerProject implements IStagePerProject {
    constructor() { }
}
