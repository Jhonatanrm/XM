import { Assets } from '@core/entry-projects/model/IAssets';
import { Metadata } from '@core/entry-projects/model/IMetadata';

export interface IAssetsSearch {
  items?: Assets[];
  metadata?: Metadata;
}

export class AssetsSearch implements IAssetsSearch {
  metadata: any;
  constructor() { }
}
