// import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// import { BarraCrearComponent } from './barra-crear.component';
// import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { CommonModule } from '@angular/common';
// import { NgSelectModule } from '@ng-select/ng-select';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { ValidateComponent } from '@shared/components/validate/validate.component';
// import { LowercaseFormsPipe } from '@shared/pipes/lowercase-forms-pipe/lowercaseForms-pipe.pipe';
// import { ActivosTransmisionService } from '@shared/services/proyect-entry/activos-transmision.service';
// import { ITransmisionProject } from '@core/entry-projects/model/ITransmisionProject';
// import { of, throwError } from 'rxjs';
// import { Subestacion } from '@core/entry-projects/model/ISubestation';

// describe('BarraCrearComponent', () => {
//   let component: BarraCrearComponent;
//   let fixture: ComponentFixture<BarraCrearComponent>;
//   const formBuilder: FormBuilder = new FormBuilder();
//   const validate = new ValidateComponent();
//   const mookProject: ITransmisionProject = {
//     id: 1,
//     ProjectId: 1,
//     projectId: 1,
//     hasStages: true,
//   };

//   // const MOOK_SUBSTATION: Subestacion = {};
//   const MOOK_SUBSTATIONS = [
//     {
//       geographicLocation: 0,
//       isConsignable: false,
//       isStnCommercial: false,
//       isStnHerope: false,
//       isStrCommercial: false,
//       isStrHerope: false,
//       latitude: 0,
//       longitude: 0,
//       onlineDiagramUrl: null,
//       recordState: 0,
//       recordType: 'Draft"',
//       substationCode: 'NUEVA UNA ETAPA',
//       substationInstanceId: 217,
//       substationName: 'NUEVA UNA ETAPA',
//       userName: null,
//       versionComments: null
//     },
//     {
//       geographicLocation: 0,
//       isConsignable: false,
//       isStnCommercial: false,
//       isStnHerope: false,
//       isStrCommercial: false,
//       isStrHerope: false,
//       latitude: 0,
//       longitude: 0,
//       onlineDiagramUrl: null,
//       recordState: 0,
//       recordType: 'Draft"',
//       substationCode: 'Sub NUEVA',
//       substationInstanceId: 222,
//       substationName: 'Sub 01NUEVA',
//       userName: null,
//       versionComments: null
//     },
//     {
//       geographicLocation: 0,
//       isConsignable: false,
//       isStnCommercial: false,
//       isStnHerope: false,
//       isStrCommercial: false,
//       isStrHerope: false,
//       latitude: 0,
//       longitude: 0,
//       onlineDiagramUrl: null,
//       recordState: 0,
//       recordType: 'Draft"',
//       substationCode: 'Sub NUEVA2',
//       substationInstanceId: 224,
//       substationName: 'Sub 01NUEVA2',
//       userName: null,
//       versionComments: null
//     }
//   ];

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [BarraCrearComponent, ValidateComponent, LowercaseFormsPipe],
//       imports: [
//         NgbModule,
//         CommonModule,
//         ReactiveFormsModule,
//         NgSelectModule,
//         HttpClientTestingModule
//       ],
//       providers: [
//         ActivosTransmisionService,
//         { provide: FormBuilder, useValue: formBuilder },
//         { provide: ValidateComponent, useValue: validate }
//       ]
//     })
//       .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(BarraCrearComponent);
//     component = fixture.componentInstance;
//     component.project = { hasStages: true, stages: [], version: { comments: '' }, projectFpo: '' };
//     component.object = { busbarInstanceId: 0 },
//       component.ngbTabset = 'informacionBasica';
//     component.validate = validate;
//     component.barraForm = formBuilder.group({
//       informacionBasica: formBuilder.group({
//         busbarName: [''],
//         subestation: [null],
//         stageProject: [null],
//         nominalTension: [null],
//         busbarNumber: [null],
//         owner: [null],
//         operator: [null]
//       }),
//       datosTecnicos: formBuilder.group({
//         designTension: [''],
//         currentCapacity: [''],
//         encapsulatedBusbar: ['false'],
//         sectionedBusbar: ['false'],
//         sectionsBusbar: formBuilder.array([]),
//         shortCircuitCapacity: ['']
//       }),
//       datosAdministrativos: formBuilder.group({
//         consignable: [''],
//         Herope: [''],
//         Commercial: [''],
//       }),
//       Vigencia: formBuilder.group({
//         versionComments: [''],
//       })
//     });
//     fixture.detectChanges();
//   });


//   it('should create', () => {
//     component.getActivosService();
//     component.ngOnChanges({});
//     expect(component).toBeTruthy();
//   });

//   it('should asign projectFpo ', () => {
//     component.project = {hasStages: false, stages: [], version: {comments: ''}, projectFpo: '' };
//     component.getActivosService();
//     component.ngOnChanges({});
//     component.setProjectFpo();
//     expect(component).toBeTruthy();
//   });

//   it('should called fuction getConfigurations', () => {
//     const spyMethod = spyOn(component.getActivosService(), 'getSubestationBK')
//       .withArgs(0)
//       .and.returnValue(of());
//     component.getConfigurations(0);
//     expect(spyMethod).toHaveBeenCalled();
//   });

//   it('Shuld called VoltageLevelKinds', () => {
//     const spyMethod = spyOn(component.getGeneralListService(), 'getGeneralList')
//       .withArgs('NivelTension')
//       .and.returnValue(of([]));
//     component.VoltageLevelKinds();
//     expect(spyMethod).toHaveBeenCalled();
//   });

//   it('Should see alert message error VoltageLevelKinds', () => {
//     spyOn(console, 'error');
//     spyOn(component.getGeneralListService(), 'getGeneralList')
//       .withArgs('NivelTension')
//       .and.returnValue(
//         throwError({
//           error: {
//             errors: null,
//             message: 'No data found',
//             statusCode: 404
//           }
//         }));
//     component.VoltageLevelKinds();
//     expect(console.error).toHaveBeenCalledWith('No data found');
//   });

//   it('Shuld called ConfigurationKinds', () => {
//     const spyMethod = spyOn(component.getGeneralListService(), 'getGeneralList')
//       .withArgs('ConfiguracionSubestacion')
//       .and.returnValue(of([]));
//     component.ConfigurationKinds();
//     expect(spyMethod).toHaveBeenCalled();
//   });

//   it('Should see alert message error ConfigurationKinds', () => {
//     spyOn(console, 'error');
//     spyOn(component.getGeneralListService(), 'getGeneralList')
//       .withArgs('ConfiguracionSubestacion')
//       .and.returnValue(
//         throwError({
//           error: {
//             errors: null,
//             message: 'No data found',
//             statusCode: 404
//           }
//         }));
//     component.ConfigurationKinds();
//     expect(console.error).toHaveBeenCalledWith('No data found');
//   });

// });
