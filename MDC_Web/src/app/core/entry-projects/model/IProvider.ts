
import {IService} from './IService';
import {IVariable} from './IVariable';
import {IParameter} from './IParameter';

export interface IProviderSend {
    environmentalDataProviderMrid?: number;
}

export interface IProvider extends IProviderSend {
    name?: string;
    services?: IService[];
    variables?: IVariable[];
    parameters?: IParameter[];
}
