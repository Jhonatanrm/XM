import { Injectable } from '@angular/core';
import { Observable, of, Subject, BehaviorSubject } from 'rxjs';

@Injectable()
export class TransmisionAssetsMockService {

    editControModal: any;
    observableEditControModal: any;

    constructor() {
        this.observableNewControlSubestacion = new BehaviorSubject(this.newControlSubestacion);
        this.observableEditControModal = new BehaviorSubject(this.editControModal);
    }

    newControlSubestacion: any;
    observableNewControlSubestacion: any;

    getAssetsBk(filterQuery: string, stagesProject: number[]): Observable<any> {
        return of({
            items: [
                {
                    recordType: 'Draft',
                    complete: true,
                    assetName: 'Aplica 27',
                    assetCode: 'Aplica 27',
                    assetId: 148,
                    parentAssetId: 0,
                    parentAssetName: null,
                    parentAssetCode: null,
                    stageProjectId: 2,
                    version: '',
                    assetType: 'Subestación'
                },
                {
                    recordType: 'Draft',
                    complete: true,
                    assetName: 'FORNT VALID',
                    assetCode: 'FORNT VALID',
                    assetId: 149,
                    parentAssetId: 0,
                    parentAssetName: null,
                    parentAssetCode: null,
                    stageProjectId: 2,
                    version: '',
                    assetType: 'Subestación'
                },
                {
                    recordType: 'Draft',
                    complete: true,
                    assetName: 'FRONT FRONT FRONT',
                    assetCode: 'FRONT FRONT FRONT',
                    assetId: 137,
                    parentAssetId: 0,
                    parentAssetName: null,
                    parentAssetCode: null,
                    stageProjectId: 2,
                    version: '',
                    assetType: 'Subestación'
                },
                {
                    recordType: 'Draft',
                    complete: true,
                    assetName: 'Name desde FRONT',
                    assetCode: 'Name desde FRONT',
                    assetId: 122,
                    parentAssetId: 0,
                    parentAssetName: null,
                    parentAssetCode: null,
                    stageProjectId: 2,
                    version: '',
                    assetType: 'Subestación'
                },
                {
                    recordType: 'Draft',
                    complete: true,
                    assetName: 'NO SALE ON SAME NAME',
                    assetCode: 'NO SALE ON SAME NAME',
                    assetId: 150,
                    parentAssetId: 0,
                    parentAssetName: null,
                    parentAssetCode: null,
                    stageProjectId: 2,
                    version: '',
                    assetType: 'Subestación'
                },
                {
                    recordType: 'Draft',
                    complete: false,
                    assetName: 'Pedromo Sub Front',
                    assetCode: 'Pedromo Sub Front',
                    assetId: 144,
                    parentAssetId: 0,
                    parentAssetName: null,
                    parentAssetCode: null,
                    stageProjectId: 2,
                    version: '',
                    assetType: 'Subestación'
                },
                {
                    recordType: 'Draft',
                    complete: true,
                    assetName: 'prueba exitosa',
                    assetCode: 'prueba exitosa',
                    assetId: 140,
                    parentAssetId: 0,
                    parentAssetName: null,
                    parentAssetCode: null,
                    stageProjectId: 3,
                    version: '',
                    assetType: 'Subestación'
                },
                {
                    recordType: 'Draft',
                    complete: true,
                    assetName: 'string',
                    assetCode: 'string',
                    assetId: 121,
                    parentAssetId: 0,
                    parentAssetName: null,
                    parentAssetCode: null,
                    stageProjectId: 0,
                    version: '',
                    assetType: 'Subestación'
                },
                {
                    recordType: 'Draft',
                    complete: true,
                    assetName: 'Sub 01 08102019 xXYa',
                    assetCode: 'Sub 01',
                    assetId: 83,
                    parentAssetId: 0,
                    parentAssetName: null,
                    parentAssetCode: null,
                    stageProjectId: 12,
                    version: '',
                    assetType: 'Subestación'
                },
                {
                    recordType: 'Draft',
                    complete: true,
                    assetName: 'Sub 02 08102019 xXYa',
                    assetCode: 'Sub 02',
                    assetId: 89,
                    parentAssetId: 0,
                    parentAssetName: null,
                    parentAssetCode: null,
                    stageProjectId: 3,
                    version: '',
                    assetType: 'Subestación'
                }
            ],
            metadata: {
                pagination: {
                    offset: 0,
                    limit: 10,
                    previousOffset: -1,
                    nextOffset: 10,
                    currentPage: 1,
                    pageCount: 2,
                    totalCount: 18
                },
                sortedBy: {
                    field: null,
                    order: null
                }
            }
        });
    }

    getAssetsCountBk(stagesProject: number[], assetType: string): Observable<any> {
        return of(20);
    }

    getSubestationBK(id: number) {
        return of({
            substationInstanceId: 221,
            elementPerProjectStageInstanceId: 58,
            substationName: 'Sub CC',
            stageProjectId: 1,
            latitude: 10,
            longitude: 10,
            geographicLocation: 7589,
            subAreaId: 5,
            recordState: 0,
            stnHerope: true,
            strHerope: true,
            stnCommercial: true,
            strCommercial: true,
            consignable: true,
            versionComments: 'BB1X2',
            username: null,
            substationConfiguration: [
                {
                    substationConfigurationInstanceId: 70,
                    voltageLevelId: 10,
                    shortCircuitCapacity: 50,
                    substationConfigurationId: 10,
                    diagramUrl: null,
                    remove: false
                },
                {
                    substationConfigurationInstanceId: 71,
                    voltageLevelId: 9,
                    shortCircuitCapacity: 49,
                    substationConfigurationId: 9,
                    diagramUrl: null,
                    remove: false
                }
            ]
        });
    }

    getAllAreas() {
        return of([
            {
                id: 0,
                code: 'Are0000',
                name: 'Indefinida'
            },
            {
                id: 1,
                code: 'Are0002',
                name: 'Antioquia'
            },
            {
                id: 2,
                code: 'Are0012',
                name: 'Nordeste'
            },
            {
                id: 3,
                code: 'Are0056',
                name: 'Oriental'
            },
            {
                id: 4,
                code: 'Are0064',
                name: 'Ecuador'
            },
            {
                id: 5,
                code: 'Are0065',
                name: 'Venezuela'
            },
            {
                id: 6,
                code: 'Are0115',
                name: 'No Definida'
            },
            {
                id: 7,
                code: 'Are0127',
                name: 'Caribe'
            },
            {
                id: 8,
                code: 'Are0128',
                name: 'Suroccidental'
            }
        ]);
    }

    getAllSubAreasByIdArea(id: number) {
        return of([
            {
                id: 14,
                code: 'Are0029',
                name: 'Norte de Santander',
                area: {
                    id: 2,
                    code: null,
                    name: null
                }
            },
            {
                id: 18,
                code: 'Are0129',
                name: 'Arauca',
                area: {
                    id: 2,
                    code: null,
                    name: null
                }
            },
            {
                id: 19,
                code: 'Are0130',
                name: 'Boyaca-Casanare',
                area: {
                    id: 2,
                    code: null,
                    name: null
                }
            },
            {
                id: 20,
                code: 'Are0131',
                name: 'Santander',
                area: {
                    id: 2,
                    code: null,
                    name: null
                }
            }
        ]);
    }

    getSubAreaById(id: number) {
        return of({
            id: 2,
            code: 'Are0016',
            name: 'Atlantico',
            area: {
                id: 7,
                code: null,
                name: null
            }
        });
    }

    getAreasId(id: number) {
        return of({
            id: 2,
            code: 'Are0012',
            name: 'Nordeste'
        });
    }

    getLocationByGeographicLocationID(id: number) {
        return of({
            id: 8179,
            departmentCode: '08',
            departmentName: 'ATLÁNTICO',
            municipalityCode: '08296',
            municipalityName: 'GALAPA',
            longitude: -74.86693572998047,
            latitude: 10.91964054107666
        });
    }

    getGeneralList(text: string) {
        if (text === 'NivelTension') {
            return of([
                {
                    typeMRID: 1001,
                    codeValue: '1',
                    detailValue: '34.5'
                },
                {
                    typeMRID: 1002,
                    codeValue: '2',
                    detailValue: '44'
                },
                {
                    typeMRID: 1003,
                    codeValue: '3',
                    detailValue: '57.5'
                },
                {
                    typeMRID: 1004,
                    codeValue: '4',
                    detailValue: '66'
                },
                {
                    typeMRID: 1005,
                    codeValue: '5',
                    detailValue: '110'
                },
                {
                    typeMRID: 1006,
                    codeValue: '6',
                    detailValue: '115'
                },
                {
                    typeMRID: 1007,
                    codeValue: '7',
                    detailValue: '220'
                },
                {
                    typeMRID: 1008,
                    codeValue: '8',
                    detailValue: '230'
                },
                {
                    typeMRID: 1009,
                    codeValue: '9',
                    detailValue: '500'
                }
            ]);
        } else {
            return of([
                {
                    typeMRID: 18,
                    codeValue: '1',
                    detailValue: 'Barra sencilla'
                },
                {
                    typeMRID: 19,
                    codeValue: '2',
                    detailValue: 'Barra principal más barra transferencia'
                },
                {
                    typeMRID: 20,
                    codeValue: '3',
                    detailValue: 'Doble barra'
                },
                {
                    typeMRID: 21,
                    codeValue: '4',
                    detailValue: 'Doble barra más barra de transferencia'
                },
                {
                    typeMRID: 22,
                    codeValue: '5',
                    detailValue: 'Doble barra más seccionador de bypass'
                },
                {
                    typeMRID: 23,
                    codeValue: '6',
                    detailValue: 'Doble barra más seccionador de transferencia'
                },
                {
                    typeMRID: 24,
                    codeValue: '7',
                    detailValue: 'Interruptor y medio'
                },
                {
                    typeMRID: 25,
                    codeValue: '8',
                    detailValue: 'Anillo'
                }
            ]);
        }
    }

    getDepartamentosBk() {
        return of([
            {
                id: 12002,
                departmentCode: '88',
                departmentName: '"ARCHIPIÉLAGO DE SAN ANDRÉS, PROVIDENCIA Y SANTA CATALINA"',
                municipalityCode: null,
                municipalityName: null,
                longitude: 0,
                latitude: 0
            },
            {
                id: 8258,
                departmentCode: '11',
                departmentName: '"BOGOTÁ, D. C."',
                municipalityCode: null,
                municipalityName: null,
                longitude: 0,
                latitude: 0
            },
            {
                id: 12009,
                departmentCode: '91',
                departmentName: 'AMAZONAS',
                municipalityCode: null,
                municipalityName: null,
                longitude: 0,
                latitude: 0
            },
            {
                id: 7406,
                departmentCode: '05',
                departmentName: 'ANTIOQUIA',
                municipalityCode: null,
                municipalityName: null,
                longitude: 0,
                latitude: 0
            },
            {
                id: 11722,
                departmentCode: '81',
                departmentName: 'ARAUCA',
                municipalityCode: null,
                municipalityName: null,
                longitude: 0,
                latitude: 0
            },
            {
                id: 8169,
                departmentCode: '08',
                departmentName: 'ATLÁNTICO',
                municipalityCode: null,
                municipalityName: null,
                longitude: 0,
                latitude: 0
            },
            {
                id: 8271,
                departmentCode: '13',
                departmentName: 'BOLÍVAR',
                municipalityCode: null,
                municipalityName: null,
                longitude: 0,
                latitude: 0
            },
            {
                id: 8756,
                departmentCode: '15',
                departmentName: 'BOYACÁ',
                municipalityCode: null,
                municipalityName: null,
                longitude: 0,
                latitude: 0
            },
            {
                id: 9006,
                departmentCode: '17',
                departmentName: 'CALDAS',
                municipalityCode: null,
                municipalityName: null,
                longitude: 0,
                latitude: 0
            },
            {
                id: 9207,
                departmentCode: '18',
                departmentName: 'CAQUETÁ',
                municipalityCode: null,
                municipalityName: null,
                longitude: 0,
                latitude: 0
            },
            {
                id: 11798,
                departmentCode: '85',
                departmentName: 'CASANARE',
                municipalityCode: null,
                municipalityName: null,
                longitude: 0,
                latitude: 0
            },
            {
                id: 9318,
                departmentCode: '19',
                departmentName: 'CAUCA',
                municipalityCode: null,
                municipalityName: null,
                longitude: 0,
                latitude: 0
            },
            {
                id: 9737,
                departmentCode: '20',
                departmentName: 'CESAR',
                municipalityCode: null,
                municipalityName: null,
                longitude: 0,
                latitude: 0
            },
            {
                id: 12634,
                departmentCode: '27',
                departmentName: 'CHOCÓ',
                municipalityCode: null,
                municipalityName: null,
                longitude: 0,
                latitude: 0
            },
            {
                id: 9966,
                departmentCode: '23',
                departmentName: 'CÓRDOBA',
                municipalityCode: null,
                municipalityName: null,
                longitude: 0,
                latitude: 0
            },
            {
                id: 10523,
                departmentCode: '25',
                departmentName: 'CUNDINAMARCA',
                municipalityCode: null,
                municipalityName: null,
                longitude: 0,
                latitude: 0
            },
            {
                id: 12066,
                departmentCode: '94',
                departmentName: 'GUAINÍA',
                municipalityCode: null,
                municipalityName: null,
                longitude: 0,
                latitude: 0
            },
            {
                id: 12090,
                departmentCode: '95',
                departmentName: 'GUAVIARE',
                municipalityCode: null,
                municipalityName: null,
                longitude: 0,
                latitude: 0
            },
            {
                id: 13038,
                departmentCode: '41',
                departmentName: 'HUILA',
                municipalityCode: null,
                municipalityName: null,
                longitude: 0,
                latitude: 0
            },
            {
                id: 13248,
                departmentCode: '44',
                departmentName: 'LA GUAJIRA',
                municipalityCode: null,
                municipalityName: null,
                longitude: 0,
                latitude: 0
            },
            {
                id: 13422,
                departmentCode: '47',
                departmentName: 'MAGDALENA',
                municipalityCode: null,
                municipalityName: null,
                longitude: 0,
                latitude: 0
            },
            {
                id: 13730,
                departmentCode: '50',
                departmentName: 'META',
                municipalityCode: null,
                municipalityName: null,
                longitude: 0,
                latitude: 0
            },
            {
                id: 13921,
                departmentCode: '52',
                departmentName: 'NARIÑO',
                municipalityCode: null,
                municipalityName: null,
                longitude: 0,
                latitude: 0
            },
            {
                id: 14498,
                departmentCode: '54',
                departmentName: 'NORTE DE SANTANDER',
                municipalityCode: null,
                municipalityName: null,
                longitude: 0,
                latitude: 0
            },
            {
                id: 11891,
                departmentCode: '86',
                departmentName: 'PUTUMAYO',
                municipalityCode: null,
                municipalityName: null,
                longitude: 0,
                latitude: 0
            },
            {
                id: 14708,
                departmentCode: '63',
                departmentName: 'QUINDÍO',
                municipalityCode: null,
                municipalityName: null,
                longitude: 0,
                latitude: 0
            },
            {
                id: 14797,
                departmentCode: '66',
                departmentName: 'RISARALDA',
                municipalityCode: null,
                municipalityName: null,
                longitude: 0,
                latitude: 0
            },
            {
                id: 14956,
                departmentCode: '68',
                departmentName: 'SANTANDER',
                municipalityCode: null,
                municipalityName: null,
                longitude: 0,
                latitude: 0
            },
            {
                id: 10580,
                departmentCode: '70',
                departmentName: 'SUCRE',
                municipalityCode: null,
                municipalityName: null,
                longitude: 0,
                latitude: 0
            },
            {
                id: 10885,
                departmentCode: '73',
                departmentName: 'TOLIMA',
                municipalityCode: null,
                municipalityName: null,
                longitude: 0,
                latitude: 0
            },
            {
                id: 11154,
                departmentCode: '76',
                departmentName: 'VALLE DEL CAUCA',
                municipalityCode: null,
                municipalityName: null,
                longitude: 0,
                latitude: 0
            },
            {
                id: 12146,
                departmentCode: '97',
                departmentName: 'VAUPÉS',
                municipalityCode: null,
                municipalityName: null,
                longitude: 0,
                latitude: 0
            },
            {
                id: 12164,
                departmentCode: '99',
                departmentName: 'VICHADA',
                municipalityCode: null,
                municipalityName: null,
                longitude: 0,
                latitude: 0
            }
        ]);
    }

    getMuniciposBk(id: number) {
        return of({
            items: [
                {
                    id: 14603,
                    departmentCode: '54',
                    departmentName: 'NORTE DE SANTANDER',
                    municipalityCode: '54313',
                    municipalityName: 'GRAMALOTE',
                    longitude: -72.78682708740234,
                    latitude: 7.916581630706787
                },
                {
                    id: 14607,
                    departmentCode: '54',
                    departmentName: 'NORTE DE SANTANDER',
                    municipalityCode: '54344',
                    municipalityName: 'HACARÍ',
                    longitude: -73.1459732055664,
                    latitude: 8.321714401245117
                },
                {
                    id: 14612,
                    departmentCode: '54',
                    departmentName: 'NORTE DE SANTANDER',
                    municipalityCode: '54347',
                    municipalityName: 'HERRÁN',
                    longitude: -72.4835205078125,
                    latitude: 7.506540775299072
                },
                {
                    id: 14613,
                    departmentCode: '54',
                    departmentName: 'NORTE DE SANTANDER',
                    municipalityCode: '54377',
                    municipalityName: 'LABATECA',
                    longitude: -72.4958724975586,
                    latitude: 7.298339366912842
                },
                {
                    id: 14614,
                    departmentCode: '54',
                    departmentName: 'NORTE DE SANTANDER',
                    municipalityCode: '54385',
                    municipalityName: 'LA ESPERANZA',
                    longitude: -73.32789611816406,
                    latitude: 7.63999080657959
                },
                {
                    id: 14623,
                    departmentCode: '54',
                    departmentName: 'NORTE DE SANTANDER',
                    municipalityCode: '54398',
                    municipalityName: 'LA PLAYA',
                    longitude: -73.2386474609375,
                    latitude: 8.212627410888672
                },
                {
                    id: 14626,
                    departmentCode: '54',
                    departmentName: 'NORTE DE SANTANDER',
                    municipalityCode: '54405',
                    municipalityName: 'LOS PATIOS',
                    longitude: -72.5057144165039,
                    latitude: 7.833256244659424
                },
                {
                    id: 14636,
                    departmentCode: '54',
                    departmentName: 'NORTE DE SANTANDER',
                    municipalityCode: '54418',
                    municipalityName: 'LOURDES',
                    longitude: -72.83251190185547,
                    latitude: 7.944519519805908
                },
                {
                    id: 14637,
                    departmentCode: '54',
                    departmentName: 'NORTE DE SANTANDER',
                    municipalityCode: '54480',
                    municipalityName: 'MUTISCUA',
                    longitude: -72.74713897705078,
                    latitude: 7.300280570983887
                },
                {
                    id: 14640,
                    departmentCode: '54',
                    departmentName: 'NORTE DE SANTANDER',
                    municipalityCode: '54498',
                    municipalityName: 'OCAÑA',
                    longitude: -73.3558120727539,
                    latitude: 8.247453689575195
                }
            ],
            metadata: {
                pagination: {
                    offset: 0,
                    limit: 10,
                    previousOffset: -1,
                    nextOffset: 10,
                    currentPage: 1,
                    pageCount: 4,
                    totalCount: 40
                },
                sortedBy: {
                    field: null,
                    order: null
                }
            }
        });
    }

    cahngeEditModal() {
        this.observableEditControModal.next(this.editControModal);
    }
    changeEditModalControl(evt: any) {
        this.editControModal = evt;
        this.cahngeEditModal();
    }

    deleteSubestationByIdBk(row: any) {
        return of({});
    }
}
