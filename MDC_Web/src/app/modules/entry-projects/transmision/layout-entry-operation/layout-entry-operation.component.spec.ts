import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutEntryOperationComponent } from './layout-entry-operation.component';

describe('LayoutEntryOperationComponent', () => {
  let component: LayoutEntryOperationComponent;
  let fixture: ComponentFixture<LayoutEntryOperationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutEntryOperationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutEntryOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
/*
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  */
});
