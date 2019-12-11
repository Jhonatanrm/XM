import { IGenerationDTO } from './IGenerationDTO';
import { IMetadata } from './IMetadata';

export interface IGenerationSearch {
  items?: IGenerationDTO[];     // sSi es creación va null, si es edicion si iria
  metadata?: IMetadata;
}
