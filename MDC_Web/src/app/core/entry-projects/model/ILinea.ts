import { ISubestacion } from './ISubestation';

export interface ILinea {
    id?: number;
    name?: string;
    subestaciones?: ISubestacion[];
}

export class Linea implements ILinea {
    constructor() {

    }
}