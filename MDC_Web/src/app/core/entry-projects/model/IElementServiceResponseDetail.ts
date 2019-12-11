import {IElementTypeDetail} from './IElementTypeDetail';

export interface IElementServiceResponseDetail{
    environmentalInformationMrid: number;
    variableName: string;
    elementTypeDetails: IElementTypeDetail[];
}