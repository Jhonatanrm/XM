import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SubestacionCrearComponent } from './subestacion-crear.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { ValidateComponent } from '@shared/components/validate/validate.component';
import { ActivosTransmisionService } from '@shared/services/proyect-entry/activos-transmision.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { LowercaseFormsPipe } from '@shared/pipes/lowercase-forms-pipe/lowercaseForms-pipe.pipe';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ITransmisionProject } from '@core/entry-projects/model/ITransmisionProject';
import { DivisionPolitica, IDivisionPolitica } from '@core/entry-projects/model/IDivisionPolitica';
import { of, throwError } from 'rxjs';



describe('SubestacionCrearComponent', () => {
    let component: SubestacionCrearComponent;
    let fixture: ComponentFixture<SubestacionCrearComponent>;
    const formBuilder: FormBuilder = new FormBuilder();
    const validate = new ValidateComponent();
    const mookProject: ITransmisionProject = {
        id: 1,
        ProjectId: 1,
        projectId: 1,
        hasStages: true,
        projectFpo: '2019-10-28T00:00:00',
        version: {
            creationDate: '2019-10-29T00:00:00',
            recordType: 'Active',
            validFrom: '2019-10-29T19:52:57.9566667',
            validTo: '9999-12-31T00:00:00',
            versionNumber: null,
            comments: 'se detecto aqui en pruebas'
        },
        stages: [{
            fpoDate: '2019-11-01T00:00:00',
            id: 1,
            stageDescription: 'Etapa 1',
            stageOrder: 1,
        }],
        subArea: {
            code: 'Are0016',
            id: 2,
            name: 'Atlantico',
            area: {
                code: null,
                id: 7,
                name: null
            },
        }
    };

    const mookDepartamentos: IDivisionPolitica[] = [
        {
            items: [
                {
                    codDepartamento: '05',
                    codMunicipio: '05142',
                    idAreaGeografica: 7586,
                    latitud: 6.409854888916016,
                    longitud: -74.7574462890625,
                    nombreDepartamento: 'ANTIOQUIA',
                    nombreMunicipio: 'CARACOLÍ'
                },
                {
                    codDepartamento: '08',
                    codMunicipio: '08758',
                    idAreaGeografica: 8244,
                    latitud: 10.910174369812012,
                    longitud: -74.78483581542969,
                    nombreDepartamento: 'ATLÁNTICO',
                    nombreMunicipio: 'SOLEDAD'
                }
            ]
        }
    ];

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SubestacionCrearComponent, ValidateComponent, LowercaseFormsPipe],
            imports: [
                NgbModule,
                NgSelectModule,
                CommonModule,
                ReactiveFormsModule,
                HttpClientTestingModule,
            ],
            providers: [
                // ActivosTransmisionService,
                // { provide: FormBuilder, useValue: formBuilder },
                // { provide: ValidateComponent, useValue: validate }
            ]

        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SubestacionCrearComponent);
        component = fixture.componentInstance;
        component.project = mookProject;
        component.object = {};
        component.departamentos = mookDepartamentos;
        component.municipios = mookDepartamentos;
        component.validate = validate;
        component.subestacionForm = formBuilder.group({
            informacionBasica: formBuilder.group({
                substationName: [''],
                XMStagePerSubstation: [null],
                latitude: [null],
                longitude: [null],
                DivisionPoliticaDepartamento: [null],
                DivisionPoliticaMunicipio: [null],
                SubArea: [null],
                AreaProyecto: [null]
            }),
            datosTecnicos: formBuilder.group({
                subestationConfiguration: formBuilder.array([]),
            }),
            datosAdministrativos: formBuilder.group({
                consignable: [''],
                Herope: [''],
                Commercial: [''],
            }),
            Vigencia: formBuilder.group({
                versionComments: [''],
            })
        });
        // component.subestacionForm.addControl('substationInstanceId', null);
        fixture.detectChanges();
    });

    /*
    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should called ngOnchanges function', () => {
        component.ngOnChanges({});
        expect(component.subestacionForm).toBeDefined();
    });

    it('should asign projectFpo on hasStages false', () => {
        component.project.hasStages = false;
        component.setProjectFpo();
        expect(component.projectFpo).toBeTruthy();
    });

    it('should called fuction ConfiguraitonKinds', () => {
        const spyMethod = spyOn(component.getGeneralListService(), 'getGeneralList')
            .withArgs('ConfiguracionSubestacion')
            .and.returnValue(of([]));
        component.ConfigurationKinds();
        expect(spyMethod).toHaveBeenCalled();
    });

    it('Should see alert message error ConfiguraitonKinds', () => {
        spyOn(console, 'error');
        spyOn(component.getGeneralListService(), 'getGeneralList')
        .withArgs('ConfiguracionSubestacion').and.returnValue(
            throwError({
                error: {
                    errors: null,
                    message: 'No data found',
                    statusCode: 404
                }
            }));
        component.ConfigurationKinds();
        expect(console.error).toHaveBeenCalledWith('No data found');
    });

    it('should called fuction VoltageLevelKinds', () => {
        const spyMethod = spyOn(component.getGeneralListService(), 'getGeneralList')
            .withArgs('NivelTension')
            .and.returnValue(of([]));
        component.VoltageLevelKinds();
        expect(spyMethod).toHaveBeenCalled();
    });

    it('Should see alert message error VoltageLevelKinds', () => {
        spyOn(console, 'error');
        spyOn(component.getGeneralListService(), 'getGeneralList')
        .withArgs('NivelTension')
        .and.returnValue(
            throwError({
                error: {
                    errors: null,
                    message: 'No data found',
                    statusCode: 404
                }
            }));
        component.VoltageLevelKinds();
        expect(console.error).toHaveBeenCalledWith('No data found');
    });

    it('should called fuction getDepartamentos', () => {
        const spyMethod = spyOn(component.getActivosService(), 'getAllLocations')
            .and.returnValue(of([]));
        component.getDepartamentos();
        expect(spyMethod).toHaveBeenCalled();
    });

    it('Should see alert message error getDepartamentos', () => {
        spyOn(console, 'error');
        spyOn(component.getActivosService(), 'getAllLocations')
            .and.returnValue(
                throwError({
                    error: {
                        errors: null,
                        message: 'No data found',
                        statusCode: 404
                    }
                }));
        component.getDepartamentos();
        expect(console.error).toHaveBeenCalledWith('No data found');
    });

    it('should called fuction getMunicipios', () => {
        const spyMethod = spyOn(component.getActivosService(), 'getMunicipalitiesByDeparmentCode')
            .withArgs('1')
            .and.returnValue(of([]));
        component.getMunicipios('1');
        expect(spyMethod).toHaveBeenCalled();
    });

    it('Should see alert message error getMunicipios', () => {
        spyOn(console, 'error');
        spyOn(component.getActivosService(), 'getMunicipalitiesByDeparmentCode')
            .withArgs('1')
            .and.returnValue(
                throwError({
                    error: {
                        errors: null,
                        message: 'No data found',
                        statusCode: 404
                    }
                }));
        component.getMunicipios('1');
        expect(console.error).toHaveBeenCalledWith('No data found');
    });

    it('should called fuction getAreas', () => {
        const spyMethod = spyOn(component.getMasterData(), 'getAllAreas')
            .and.returnValue(of([]));
        component.getAreas();
        expect(spyMethod).toHaveBeenCalled();
    });

    it('Should see alert message error getAreas', () => {
        spyOn(console, 'error');
        spyOn(component.getMasterData(), 'getAllAreas')
            .and.returnValue(
                throwError({
                    error: {
                        errors: null,
                        message: 'No data found',
                        statusCode: 404
                    }
                }));
        component.getAreas();
        expect(console.error).toHaveBeenCalledWith('No data found');
    });

    it('should called fuction areasById', () => {
        const spyMethod = spyOn(component.getMasterData(), 'getAreasId')
            .withArgs(7)
            .and.returnValue(of([]));
        component.areasById();
        expect(spyMethod).toHaveBeenCalled();
    });

    it('Should see alert message error areasById', () => {
        spyOn(console, 'error');
        spyOn(component.getMasterData(), 'getAreasId')
            .withArgs(7)
            .and.returnValue(
                throwError({
                    error: {
                        errors: null,
                        message: 'No data found',
                        statusCode: 404
                    }
                }));
        component.areasById();
        expect(console.error).toHaveBeenCalledWith('No data found');
    });

    it('should called fuction getSubAreas', () => {
        const spyMethod = spyOn(component.getMasterData(), 'getAllSubAreasByIdArea')
            .withArgs(7)
            .and.returnValue(of([]));
        component.getSubAreas(7);
        expect(spyMethod).toHaveBeenCalled();
    });

    it('Should see alert message error getSubAreas', () => {
        spyOn(console, 'error');
        spyOn(component.getMasterData(), 'getAllSubAreasByIdArea')
            .withArgs(7)
            .and.returnValue(
                throwError({
                    error: {
                        errors: null,
                        message: 'No data found',
                        statusCode: 404
                    }
                }));
        component.getSubAreas(7);
        expect(console.error).toHaveBeenCalledWith('No data found');
    });

    it('Should called function createItem', () => {
        component.createItem();
        expect(component.subestacionForm).toBeDefined();
    });

    it('Should called function onDelete', () => {
        component.onDelete(1, { preventDefault: () => { } });
        expect(component.subestacionForm).toBeDefined();
    });

    it('Should called function onChangesForm', () => {
        component.onChangesForm();
        expect(component.subestacionForm).toBeDefined();
    });

    it('Should called function heropeClick', () => {
        component.heropeClick({});
        expect(component.subestacionForm).toBeDefined();
    });

    it('Should called function heroCommercialpeClick', () => {
        component.heroCommercialpeClick({});
        expect(component.subestacionForm).toBeDefined();
    });

    it('Should called function uploadUnifilarDiagram', () => {
        component.addSubestaationConfigAElement({ preventDefault: () => { } });
        expect(component.subestacionForm).toBeDefined();
    });

    it('On Edit Subestation SetAttr ', () => {
        component.object = { substationInstanceId: 0 };
        component.setAttr();
        expect(component.object).toBeTruthy();
    });

    it('On Edit Subestation setSubstarionConfigrations ', () => {
        component.object = { substationInstanceId: 0 ,  substationConfiguration: []};
        component.setSubstarionConfigrations();
        expect(component.object).toBeTruthy();
    });

    it('On Edit Subestation setDepartment ', () => {
        component.object = { substationInstanceId: 0, geographicLocation: 0 };
        component.departamentos = [];
        const spyMethod = spyOn(component.getMasterData(), 'getLocationByGeographicLocationID')
            .withArgs('1').and.returnValue(of({}));

        component.setDepartment();

        expect(component.object).toBeTruthy();
    });

    it('Should called function Events On Chabge', () =>{
        component.formTabChange({});
        component.changeObjInput();
        expect(component).toBeTruthy();
    });

*/
});
