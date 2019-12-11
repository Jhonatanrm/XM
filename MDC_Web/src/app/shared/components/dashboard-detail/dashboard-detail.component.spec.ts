import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardDetailComponent } from './dashboard-detail.component';

describe('DashboardDetailComponent', () => {
  let component: DashboardDetailComponent;
  let fixture: ComponentFixture<DashboardDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardDetailComponent);
    component = fixture.componentInstance;
    component.text = 'abc';
    component.object = {
      projectName: 'NameProject',
      conectionType: 1,
      subArea: {name: ''} };
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  // it('Open Details', () => {
  //   component.openDetail();
  //   expect(component.open).toEqual(true);
  // });
});
