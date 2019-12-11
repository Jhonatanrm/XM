import { ITransmisionDTO } from './ITransmisionDTO';

export interface ITransmisionSearch {
  items?: ITransmisionDTO[];     // sSi es creación va null, si es edicion si iria
  metadata?: any;
}
