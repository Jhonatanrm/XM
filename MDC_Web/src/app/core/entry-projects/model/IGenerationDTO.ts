import { Stage } from './IStage';
import { IDocumentsUpmeDTO } from './IDocumentsUpme';

export interface IGenerationDTO {
  ProjectID?: number;     // sSi es creación va null, si es edicion si iria
  ProjectInstanceId?: number;
  ProjectCode?: string;
  ProjectName?: string;
  ProjectDescription?: string;
  ProjectType?: number;   // GeneralTypes: TipoProyecto. 2 = Transmisión
  PromoterId?: number;    //  id de promotor
  PromoterName?: string;
  SubAreaID?: number;
  AreaName?: string;
  ProjectFpo?: Date;    // deberia ser un campo tipo fecha, el nombre no es muy diciente para saber que es date
  ProjectFpoFormated?: string;
  UserName?: string;                //por defecto: Enviar quemado: xmpproyectos
  UpmeId?: number;        // Enviar siempre null
  Stages?: Stage[];


  TransportCapacity?: number;   // MW
  NetEffectiveCapacity?: number;  // MW
  NetEffectiveCapacityEffic?: number; // MW OEF
  FirmEnergyObligation?: boolean;  //   radio firm energy
  ProjectFpoUpme?: Date;
  DateIpvo?: Date;    //firm energy Date OEF


  GenerationResourceID?: number; // ng list
  GenerationResource?: string;
  TypeProductiveProcessID?: number;


  // ----------------- attribute add  when add edit object

  connectionTransportSystemID?: number; // in form label name 'Sistema de transporte al que conecta'
  connectionPointName?: string; // label/text of conection point
  conectionPointID?: number; // id of obj select or null when exist only a name point
  dispatchedTypeID?: number; // of Tipo de despacho label in form, id of obj select of list.
  cycleTypeID?: number // of label Tipo de ciclo, id of item select from ng list (energia termina)

  //cicle wind fields
  averageRoomTemperature?: number;  // also is a field of solar cicle type
  windSpeed?: string | number;
  windDensity?: number;

  // solar fields
  averageHorizontalGlobalIrradiation?: number;
  averagePanelIrradiation?: number;


  // document upme  object
  documentsUpme?: IDocumentsUpmeDTO[];

  projectRIDModified?: string;
  projectRID?: number;
  generationProjectId?: number;

  comments?: string;
}

export class GenerationDTO implements IGenerationDTO {
  constructor() { }
}
