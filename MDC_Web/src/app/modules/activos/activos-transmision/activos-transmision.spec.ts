// import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// import { ActivosTransmisionComponent } from './activos-transmision.component';
// import { SubestacionComponent } from './subestacion/subestacion/subestacion.component';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { LineaComponent } from './linea/linea/linea.component';
// import { WaitComponent } from '@shared/components/wait/wait.component';
// import { DashboardDetailComponent } from '@shared/components/dashboard-detail/dashboard-detail.component';
// import { SubestacionTableroComponent } from './subestacion/subestacion-tablero/subestacion-tablero.component';
// import { ModalFormComponent } from '@shared/components/modal-form/modal-form.component';
// import { SubestacionListarComponent } from './subestacion/subestacion-listar/subestacion-listar.component';
// import { SubestacionCrearComponent } from './subestacion/subestacion-crear/subestacion-crear.component';
// import { BarraCrearComponent } from './subestacion/barra-crear/barra-crear.component';
// import { BahiaCorteCentralCrearComponent } from './subestacion/bahia-corte-central-crear/bahia-corte-central-crear.component';
// import { BahiaSeccionamientoCrearComponent } from './subestacion/bahia-seccionamiento-crear/bahia-seccionamiento-crear.component';
// import { BahiaTransferenciaCrearComponent } from './subestacion/bahia-transferencia-crear/bahia-transferencia-crear.component';
// import { BahiaAcopleCrearComponent } from './subestacion/bahia-acople-crear/bahia-acople-crear.component';
// import { TableXmComponent } from '@shared/components/table-xm/table-xm.component';
// import { LineaCrearComponent } from './linea/linea-crear/linea-crear.component';
// import { ValidateComponent } from '@shared/components/validate/validate.component';
// import { ProjectPipe } from '@shared/pipes/project-pipe/project-pipe.pipe';
// import { CommonModule } from '@angular/common';
// import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, FormArray } from '@angular/forms';
// import { NgSelectModule } from '@ng-select/ng-select';
// import { MatSortModule } from '@angular/material';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { RouterTestingModule } from '@angular/router/testing';
// import { ActivatedRoute } from '@angular/router';
// import { LowercaseFormsPipe } from '@shared/pipes/lowercase-forms-pipe/lowercaseForms-pipe.pipe';
// import { SubstationTablePipe } from '@shared/pipes/subestation-table-pipe/subTable-pipe.pipe';
// import { SubestationEditComponent } from './subestacion/subestation-edit/subestation-edit.component';
// import { ActivosTransmisionService } from '@shared/services/proyect-entry/activos-transmision.service';
// import { of, throwError } from 'rxjs';
// import { ITransmisionProject, TransmisionProject } from '@core/entry-projects/model/ITransmisionProject';
// import { GeneralList } from '@core/entry-projects/model/IGeneralList';
// import { Subestacion } from '@core/entry-projects/model/ISubestation';

// describe('ActivosTransmisionCrearComponent', () => {
//     let component: ActivosTransmisionComponent;
//     let fixture: ComponentFixture<ActivosTransmisionComponent>;

//     const mookProject: ITransmisionProject = {
//         id: 1,
//         ProjectId: 1,
//         projectId: 1,
//         hasStages: true,
//     };

//     const mookTypeConections: GeneralList[] = [
//         { typeMRID: 3, codeValue: '1', detailValue: 'STN' },
//         { typeMRID: 4, codeValue: '2', detailValue: 'STR' },
//         { typeMRID: 5, codeValue: '3', detailValue: 'Conexión de Carga' }
//     ];

//     const mookSubAreaById: any = {
//         area: { id: 2, code: null, name: null },
//         code: 'Are0130',
//         id: 19,
//         name: 'Boyaca-Casanare'
//     };

//     beforeEach(async(() => {
//         TestBed.configureTestingModule({
//             declarations: [
//                 ActivosTransmisionComponent,
//                 SubestacionComponent,
//                 LineaComponent,
//                 WaitComponent,
//                 DashboardDetailComponent,
//                 SubestacionTableroComponent,
//                 ModalFormComponent,
//                 SubestacionListarComponent,
//                 SubestacionCrearComponent,
//                 SubestationEditComponent,
//                 BarraCrearComponent,
//                 BahiaCorteCentralCrearComponent,
//                 BahiaSeccionamientoCrearComponent,
//                 BahiaTransferenciaCrearComponent,
//                 BahiaAcopleCrearComponent,
//                 TableXmComponent,
//                 LineaComponent,
//                 LineaCrearComponent,
//                 ValidateComponent,
//                 ProjectPipe,
//                 LowercaseFormsPipe,
//                 SubstationTablePipe
//             ],
//             imports: [
//                 NgbModule,
//                 CommonModule,
//                 ReactiveFormsModule,
//                 NgSelectModule,
//                 MatSortModule,
//                 HttpClientTestingModule,
//                 RouterTestingModule,
//                 FormsModule
//             ],
//             providers: [
//                 {
//                     provide: ActivatedRoute,
//                     useValue: {
//                         snapshot: {
//                             paramMap: {
//                                 get(): string {
//                                     return '1';
//                                 },
//                             },
//                         },
//                     },
//                 },
//                 ActivosTransmisionService
//             ]
//         }).compileComponents();
//     }));

//     beforeEach(() => {
//         fixture = TestBed.createComponent(ActivosTransmisionComponent);
//         component = fixture.componentInstance;
//         fixture.detectChanges();
//     });

//     it('should create', () => {
//         expect(component).toBeTruthy();
//     });

//     it('Should getProject function', () => {
//         const spyMethod = spyOn(component.getServiveActivosService(), 'getProjectBK').and.returnValue(of(mookProject));
//         component.getProject();
//         expect(component.project.projectId).toBeGreaterThan(0);
//         expect(spyMethod).toHaveBeenCalled();
//     });

//     it('Should see alert message error getProject', () => {
//         spyOn(console, 'error');
//         spyOn(component.getServiveActivosService(), 'getProjectBK').and.returnValue(
//             throwError({
//                 error: {
//                     errors: null,
//                     message: 'No data found',
//                     statusCode: 404
//                 }
//             }));
//         component.getProject();
//         expect(console.error).toHaveBeenCalledWith('No data found');
//     });

//     it('Should getConectionType function', () => {
//         const spyMethod = spyOn(component.getServiceGeneralList(), 'getGeneralList')
//             .withArgs('TipoConexion')
//             .and.returnValue(of(mookTypeConections));
//         component.getConectionType();
//         // this.project.conectionTypeID
//         // his.project.conectionType = undefined
//         expect(component.project.conectionType).toEqual(undefined);
//         expect(spyMethod).toHaveBeenCalled();

//         fixture.detectChanges();
//         component.project.conectionTypeID = 3;
//         component.getConectionType();
//         expect(component.project.conectionType).toEqual('Conexión de Carga');
//         expect(spyMethod).toHaveBeenCalled();
//     });

//     it('Should see alert message error getConectionType', () => {
//         spyOn(console, 'error');
//         spyOn(component.getServiceGeneralList(), 'getGeneralList').and.returnValue(
//             throwError({
//                 error: {
//                     errors: null,
//                     message: 'No data found',
//                     statusCode: 404
//                 }
//             }));
//         component.getConectionType();
//         expect(console.error).toHaveBeenCalledWith('No data found');
//     });

//     it('Should getSubArea function', () => {
//         const spyMethod = spyOn(component.getServiceMasterData(), 'getSubAreaById')
//             .and.returnValue(of(mookSubAreaById));
//         component.getSubArea();
//         expect(component.project.subArea).toString();
//         expect(spyMethod).toHaveBeenCalled();
//     });

//     it('Should see alert message error getSubArea', () => {
//         spyOn(console, 'error');
//         spyOn(component.getServiceMasterData(), 'getSubAreaById').and.returnValue(
//             throwError({
//                 error: {
//                     errors: null,
//                     message: 'No data found',
//                     statusCode: 404
//                 }
//             }));
//         component.getSubArea();
//         expect(console.error).toHaveBeenCalledWith('No data found');
//     });

//     it('Should validControl function', () => {
//         component.validControl();
//         expect(component.Form).toBeDefined();
//     });

//     it('Should onSubmitLinea function', () => {
//         component.onSubmitLinea({});
//         expect(component.Form).toBeDefined();
//     });

//     it('Should onSubmitSubestacion function', () => {
//         const evt = { object: { complete: 0 }, statment: 'validate' };
//         const result = component.onSubmitSubestacion(evt);
//         expect(result).toBe(false);
//     });

//     it('Should onSubmitSubestacion function complete cero', () => {
//         const evt = { object: new Subestacion(), statment: 'save' };
//         component.project =  {
//             adjudicationTypeID: 7,
//             announcementNumberUpme: 'UPME STN-null-2016',
//             announcementUpme: true,
//             comments: 'Version inicial proyecto',
//             conectionType: 'Conexión de Carga',
//             conectionTypeID: 3,
//             connectionPoint1: 0,
//             connectionPoint2: 0,
//             documentsUpme: null,
//             hasStages: true,
//             includeUnitFasorialMeasurement: true,
//             projectDescription: 'Proyecto Transmisión XXXX',
//             projectFpo: '2020-01-01T00:00:00',
//             projectId: 1,
//             projectName: 'Proyecto Transmisión 1',
//             projectType: 1,
//             promoterId: 5,
//             stages: [
//                 { fpoDate: '2019-11-01T00:00:00', id: 1, stageDescription: 'Etapa 1', stageOrder: 1},
//                 { fpoDate: '2019-11-01T00:00:00', id: 1, stageDescription: 'Etapa 2', stageOrder: 2}, 
//                 { fpoDate: '2019-11-01T00:00:00', id: 1, stageDescription: 'Etapa 3', stageOrder: 3} ],
//             subArea: {
//                 id: 19,
//                 code: 'Are0130',
//                 name: 'Boyaca-Casanare',
//                 area: {code: null, id: 2, name: null} },
//             subAreaID: 19,
//             upmeID: null,
//             userName: 'xmmdctest',
//             version: {
//                 creationDate: '2019-10-25T15:38:29.688093+00:00',
//                 validFrom: '2019-10-25T15:38:29.6880958+00:00',
//                 validTo: '2019-10-25T15:38:29.6880971+00:00',
//                 versionNumber: '1.0'
//             }
//         };

//         component.Form.addControl('informacionBasica', new FormGroup({
//             substationName: new FormControl(''),
//             XMStagePerSubstation: new FormControl(null),
//             latitude: new FormControl(''),
//             longitude: new FormControl(''),
//             DivisionPoliticaDepartamento: new FormControl(null),
//             DivisionPoliticaMunicipio: new FormControl(null),
//             SubArea: new FormControl(component.project.subArea),
//             AreaProyecto: new FormControl(null),
//         }));
//         component.Form.addControl('datosTecnicos', new FormGroup({
//             subestationConfiguration: new FormArray([
//                 new FormGroup({
//                   SubstationConfigurationMRID: new FormControl(null),
//                   SubstationConfigurationInstanceId: new FormControl(null),
//                   SubstationMRID: new FormControl(null),
//                   VoltageLevelKind: new FormControl(null),
//                   ShortCircuitCapacity: new FormControl(null),
//                   SubstationConfigurationKind: new FormControl(null),
//                   unifilarDiagram: new FormControl(null),
//                 }),
//               ], {})
//         }));
//         component.Form.addControl('datosAdministrativos', new FormGroup({
//             consignable: new FormControl(''),
//             Herope: new FormControl(''),
//             Commercial: new FormControl('')
//         }));
//         component.Form.addControl('Vigencia', new FormGroup({
//             versionComments: new FormControl(),
//         }));

//         const result = component.onSubmitSubestacion(evt);
//         expect(result).toBeTruthy();
//     });


//     /*
//     it('Should onSubmitSubestacion function complete one', () => {
//         const evt = { object: new Subestacion(), statment: 'save' };
//         component.Form.addControl('informacionBasica', new FormGroup({
//             substationName: new FormControl(''),
//             XMStagePerSubstation: new FormControl(null),
//             latitude: new FormControl(''),
//             longitude: new FormControl(''),
//             DivisionPoliticaDepartamento: new FormControl(null),
//             DivisionPoliticaMunicipio: new FormControl(null),
//             SubArea: new FormControl(this.project.subArea),
//             AreaProyecto: new FormControl(null),
//         }));
//         component.Form.addControl('datosTecnicos', new FormGroup({
//             subestationConfiguration: new FormArray([
//                 new FormGroup({
//                   SubstationConfigurationMRID: new FormControl(null),
//                   SubstationConfigurationInstanceId: new FormControl(null),
//                   SubstationMRID: new FormControl(null),
//                   VoltageLevelKind: new FormControl(null),
//                   ShortCircuitCapacity: new FormControl(null),
//                   SubstationConfigurationKind: new FormControl(null),
//                   unifilarDiagram: new FormControl(null),
//                 }),
//               ], {})
//         }));
//         component.Form.addControl('datosAdministrativos', new FormGroup({
//             consignable: new FormControl(''),
//             Herope: new FormControl(''),
//             Commercial: new FormControl('')
//         }));
//         component.Form.addControl('Vigencia', new FormGroup({
//             versionComments: new FormControl(),
//         }));
//         component.Form.get('informacionBasica').patchValue({
//             substationName: 'TestNameSubestaion',
//             XMStagePerSubstation: {
//                 fpoDate: '2019-12-01T00:00:00',
//                 id: 2,
//                 stageDescription: 'Etapa 2',
//                 stageOrder: 2
//             }
//         });
//         component.Form.get('datosTecnicos').patchValue({
//             subestationConfiguration:
//                 [{
//                     ShortCircuitCapacity: null,
//                     SubstationConfigurationInstanceId: null,
//                     SubstationConfigurationKind: {
//                         typeMRID: 23,
//                         codeValue: '6',
//                         detailValue: 'Doble barra más seccionador de transferencia' },
//                     SubstationConfigurationMRID: null,
//                     SubstationMRID: null,
//                     VoltageLevelKind: { codeValue: '2', detailValue: '44', fulldetail: '44 kV', typeMRID: 1002 },
//                     unifilarDiagram: null
//                 }]
//         });
//         const result = component.onSubmitSubestacion(evt);
//         expect(result).toBe(false);
//     });
//     */
//     it('Should activosTabChange function', () => {
//         const evt = { nextId: 1 };
//         component.project = {
//             subArea: {
//                 id: 19,
//                 code: 'Are0130',
//                 name: 'Boyaca-Casanare',
//                 area: { code: null, id: 2, name: null }
//             },
//             subAreaID: 19,

//         };
//         component.Form.addControl('informacionBasica', new FormGroup({
//             substationName: new FormControl(''),
//             XMStagePerSubstation: new FormControl(null),
//             latitude: new FormControl(''),
//             longitude: new FormControl(''),
//             DivisionPoliticaDepartamento: new FormControl(null),
//             DivisionPoliticaMunicipio: new FormControl(null),
//             SubArea: new FormControl(component.project.subArea),
//             AreaProyecto: new FormControl(null),
//         }));
//         component.activosTabChange(evt);
//         expect(component.Form).toBeDefined();
//     });
// });
