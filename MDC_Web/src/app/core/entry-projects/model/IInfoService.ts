import { IbusinessParameter } from './IParameter';
import {IServiceSend} from './IService';
import {IProviderSend} from './IProvider';
import {IElementSend} from './IElement';


export interface IInfoservice extends IProviderSend, IServiceSend {
    environmentalInfoMeasuringElement?: IElementSend[];
    businessParameter?: IbusinessParameter[];
}
