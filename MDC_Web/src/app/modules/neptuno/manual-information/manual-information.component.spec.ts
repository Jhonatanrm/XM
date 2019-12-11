import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualInformationComponent } from './manual-information.component';
import { NepOnlyNumbersDirective } from '../nep-only-numbers.directive';
import { ReactiveFormsModule } from '@angular/forms';

describe('ManualInformationComponent', () => {
  let component: ManualInformationComponent;
  let fixture: ComponentFixture<ManualInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManualInformationComponent, NepOnlyNumbersDirective ],
      imports: [ ReactiveFormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManualInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
