import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeElementsComponent } from './type-elements.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

describe('TypeElementsComponent', () => {
  let component: TypeElementsComponent;
  let fixture: ComponentFixture<TypeElementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeElementsComponent ],
      imports: [ FormsModule, CommonModule, NgbModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
