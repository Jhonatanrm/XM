import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

export interface IGeneralList {
    typeMRID?: number;
    codeValue?: string;
    detailValue?: string;
    fulldetail?: string;
}

export class GeneralList implements IGeneralList {
    typeMRID: number;
    codeValue: string;
    detailValue: string;
    constructor() { }
}

