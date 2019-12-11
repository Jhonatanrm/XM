import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineaCrearComponent } from './linea-crear.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivosTransmisionService } from '@shared/services/proyect-entry/activos-transmision.service';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

describe('LineaCrearComponent', () => {
    let component: LineaCrearComponent;
    let fixture: ComponentFixture<LineaCrearComponent>;
    const formBuilder: FormBuilder = new FormBuilder();

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                LineaCrearComponent,
            ],
            imports: [
                NgbModule,
                CommonModule,
                // SharedModule,
                ReactiveFormsModule,
                NgSelectModule,
                HttpClientTestingModule
            ],
            providers: [
                ActivosTransmisionService,
                { provide: FormBuilder, useValue: formBuilder }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LineaCrearComponent);
        component = fixture.componentInstance;
        component.lineaForm = formBuilder.group({
            name: ['', Validators.required],
            subestacionInicial: ['',Validators.required],
            namelinea: ['', Validators.required]
        });
        fixture.detectChanges();
    });

    it('should create Linea', () => {
        expect(component).toBeTruthy();
    });

    it('should called ngOnchanges function', () => {
        component.ngOnChanges({});
        expect(component.lineaForm).toBeDefined();
    });
});

