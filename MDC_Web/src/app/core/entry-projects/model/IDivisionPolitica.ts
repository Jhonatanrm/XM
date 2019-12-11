export interface IDivisionPolitica {
    IdAreaGeografica?: number;
    CodDepartamento?: string;
    departmentCode?: string;
    NombreDepartamento?: string;
    CodMunicipio?: string;
    NombreMunicipio?: string;
    CodCentroPoblado?: string;
    NombreCentroPoblado?: string;
    TipoCentroPoblado?: string;
    Longitud?: number;
    Latitud?: number;
    Distrito?: string;
    TipoMunicipio?: string;
    AreaMetropolitana?: string;
    items?: any[];
}

export class DivisionPolitica implements IDivisionPolitica {
    constructor() { }
}




