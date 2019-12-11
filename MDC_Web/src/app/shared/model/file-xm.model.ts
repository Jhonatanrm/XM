import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

export interface IFileXM {
    id?: number;
    name?: string;
    size?: number;
    base64?: any;
    file?: File;
    sended?: boolean;
    urlDocument?: string;
    
    // add additional field if your business require it
    datePicker?: NgbDateStruct; // fpo del html
    date?: Date;  // fpo para enviar al back-end
    
    instanceDocument?: number;
    remove?: boolean;
    
}
