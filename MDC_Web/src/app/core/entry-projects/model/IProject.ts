import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { StagePerProject } from './IStagePerProject';

export interface IProject {
    iProjectRIDd?: number;
    ProjectInstanceId?: number;
    ProjectName?: string;
    ProjectDescription?: string;
    ProjectType?: number;
    PromoterRID?: number;
    RegisterDate?: NgbDateStruct;
    ValidFrom: NgbDateStruct;
    ValidTo?: NgbDateStruct;
    VersionComments?: string;
    UserName?: string;
    Stages?: StagePerProject[];
    // AssetsByproject?: AssetsByproject[];
    // Promoter?: Promoter;
    // ProjectRequeriment: ProjectRequeriment; // array?
    // GenerationProyect: GenerationProyect;
}
