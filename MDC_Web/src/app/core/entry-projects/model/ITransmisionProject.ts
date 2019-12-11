import { Stage } from './IStage';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { IStagePerProject } from './IStagePerProject';

export interface ITransmisionProject {
  id?: number;
  ProjectId?: number;     // sSi es creación va null, si es edicion si iria
  projectId?: number;
  projectName?: string;
  projectDescription?: string;
  projectType?: number;   // GeneralTypes: TipoProyecto. 2 = Transmisión
  promoterId?: number;    //  id de promotor
  registerDate?: NgbDateStruct;
  upmeID?: string;
  projectFpo?: string;    // deberia ser un campo tipo fecha, el nombre no es muy diciente para saber que es date
  subAreaID?: number;
  subArea?: any;
  conectionTypeID?: number;  // tipo de proyecto
  conectionType?: string;
  hasStages?: boolean;
  adjudicationTypeID?: number; // GeneralTypes: TipoAdjudicacion. Por defecto debe venir Indefinido (-1)
  announcementUpme?: boolean;  // valor: 1
  announcementNumberUpme?: string; //  "upm-152-019"
  includeUnitFasorialMeasurement?: boolean;
  creationDate?: NgbDateStruct;
  userName?: string;                //por defecto: Enviar quemado: xmpproyectos
  startDate?: NgbDateStruct;
  endDate?: NgbDateStruct;
  stages?: IStagePerProject[];
  version?: any;
  comments?: string;
  connectionPoint1?: number;
  connectionPoint2?: number;
  documentsUpme?: string;
}

export class TransmisionProject implements ITransmisionProject {
  constructor() { }
}
