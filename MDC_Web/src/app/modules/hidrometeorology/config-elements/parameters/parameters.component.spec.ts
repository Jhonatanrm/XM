import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametersComponent } from './parameters.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

describe('ParametersComponent', () => {
  let component: ParametersComponent;
  let fixture: ComponentFixture<ParametersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParametersComponent ],
      imports: [FormsModule, CommonModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
