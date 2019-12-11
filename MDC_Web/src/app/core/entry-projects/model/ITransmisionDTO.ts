import { Stage } from './IStage';
import { IDocumentsUpmeDTO } from './IDocumentsUpme';

export interface ITransmisionDTO {
  ProjectID?: number;     // sSi es creación va null, si es edicion si iria
  ProjectCode?: string;     // sSi es creación va null, si es edicion si iria
  ProjectName?: string;
  projectName?: string;
  ProjectDescription?: string;
  ProjectType?: number;   // GeneralTypes: TipoProyecto. 2 = Transmisión
  PromoterId?: number;    //  id de promotor
  PromoterName?: string;
  AreaName?: string;
  SubAreaID?: number;
  ProjectFpo?: Date;    // deberia ser un campo tipo fecha, el nombre no es muy diciente para saber que es date
  ProjectFpoFormated?: string;    // deberia ser un campo tipo fecha, el nombre no es muy diciente para saber que es date
  ConectionTypeID?: number;  // tipo de proyecto
  ConnectionType?: string;  // tipo de proyecto
  AdjudicationTypeID?: number; // GeneralTypes: TipoAdjudicacion. Por defecto debe venir Indefinido (-1)
  adjudicationTypeID?: number;
  AdjudicationType?: string; // GeneralTypes: TipoAdjudicacion. Por defecto debe venir Indefinido (-1)
  AnnouncementUpme?: boolean;  // valor: 1
  AnnouncementNumberUpme?: string; //  "upm-152-019"
  DocumentsUpme?: IDocumentsUpmeDTO[];    // valor: null DOCUMENTO ENVIAR EN NULL MIENTRAS
  UserName?: string;                // por defecto: Enviar quemado: xmpproyectos
  UpmeId?: number;        // Enviar siempre null
  Stages?: Stage[];
  IncludeUnitFasorialMeasurement?: boolean;
  ConnectionPoint1?: number;
  ConnectionPoint2?: number;
  TransmissionInstanceId?: number;
  comments?: string;
  StateDescription?: string;
  VersionComments?: string;

  ProjectRequirementRId?: number;
}

export class TransmisionDTO implements ITransmisionDTO {
  constructor() { }
}
