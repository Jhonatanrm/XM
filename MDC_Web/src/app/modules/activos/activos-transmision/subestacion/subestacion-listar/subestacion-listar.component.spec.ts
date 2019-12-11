// import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// import { SubestacionListarComponent } from './subestacion-listar.component';
// import { SharedModule } from '@shared/shared.module';
// import { ActivosTransmisionService } from '@shared/services/proyect-entry/activos-transmision.service';
// import { SubstationTablePipe } from '@shared/pipes/subestation-table-pipe/subTable-pipe.pipe';
// import { TransmisionAssetsMockService } from '@shared/unit-test/mocks/transmision-assets-mock.service';
// import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
// import { throwError } from 'rxjs';

// describe('SubestacionListarComponent', () => {
//   let component: SubestacionListarComponent;
//   let fixture: ComponentFixture<SubestacionListarComponent>;
//   let activeService: ActivosTransmisionService;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       imports: [SharedModule, BrowserAnimationsModule, NoopAnimationsModule],
//       declarations: [SubestacionListarComponent],
//       providers: [
//         {
//           provide: ActivosTransmisionService, useClass: TransmisionAssetsMockService
//         },
//         {
//           provide: SubstationTablePipe
//         }
//       ]
//     })
//       .compileComponents();

//     activeService = TestBed.get(ActivosTransmisionService);
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(SubestacionListarComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   afterEach(() => {

//   });

//   it('The component should be created with a project that has stages', () => {
//     component.project = {
//       hasStages: true,
//       projectName: 'Nombre proyecto',
//       stages: [
//         {
//           id: 1,
//           stageOrder: 1,
//         },
//         {
//           id: 2,
//           stageOrder: 2,
//         },
//         {
//           id: 3,
//           stageOrder: 3,
//         }
//       ]
//     };
//     component.assetsSearch = {};
//     component.ngOnChanges();
//     expect(component).toBeTruthy();
//   });

//   it('The component must be created with a project that has no stages', () => {
//     component.project = {
//       hasStages: false,
//       projectName: 'Nombre proyecto',
//       stages: [
//         {
//           id: 1,
//           stageOrder: 1,
//         }
//       ]
//     };
//     component.ngOnChanges();
//     expect(component).toBeTruthy();
//   });

//   it('Should see alert message error getAssetsBk', () => {
//     spyOn(console, 'error');
//     spyOn(component.getServiceActivosService(), 'getAssetsBk').and.returnValue(throwError({
//       errors: null,
//       message: 'No data found',
//       status: 404
//     }));
//     component.setAssets('?limit=10&numberPage=');
//     expect(console.error).toHaveBeenCalledWith('No data found');
//   });

//   it('Should execute filter functions', () => {
//     const event = new KeyboardEvent('enter');
//     component.searchText = 'texto';
//     component.onsearchText(event);
//     expect(component).toBeTruthy();
//   });

//   // it('Should execute de buttons functions without problems', () => {
//   //   let functionButton: {
//   //     buttonElement: { buttonName: 'Eliminar' },
//   //     row: { recordType: 'Incompleto', assetType: 'Subestación', assetId: 20 }
//   //   };
//   //   component.eventClickInButtons(functionButton);
//   //   expect(component).toBeTruthy();
//   // });
// });
