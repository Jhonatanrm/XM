import { IStage } from '@core/entry-projects/model/IStage';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

export interface IStageFormModel {
    stages?: IStage[];
    projectFPO?: NgbDateStruct;
    validForm?: boolean;
  }
