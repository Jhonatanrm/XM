import { Sort } from '@angular/material';

export interface IFilter {
    keyParameter?: string;
    sort?: Sort;
    numberPage?: number;
    limit?: number;
    //CAN YOU ADD ANY MORE ATTRIBUTES OF YOUR ESPECIFIC QUERY (NOTA: ADD ALSO VALIDATION IN Util.filterAccion)
    projectId?: string;
    pageNumber?: string;
}





