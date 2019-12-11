import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

export interface IStage {
  StageOrder?: number;  // valor: 1,  cuales son los posibles valores
  FpoDate?: Date;
  date?: NgbDateStruct;
  StageDescription?: string;
  
  id?: number;  // add  to find assets, change state project entry into operation
}

export class Stage implements IStage {
  constructor() { }
}
