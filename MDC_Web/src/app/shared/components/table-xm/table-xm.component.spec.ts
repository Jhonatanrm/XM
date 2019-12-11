import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableXmComponent } from './table-xm.component';
import { FormsModule } from '@angular/forms';
import { MatSortModule, Sort } from '@angular/material';
import { ProjectPipe } from '@shared/pipes/project-pipe/project-pipe.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

describe('TableXmComponent', () => {
  let component: TableXmComponent;
  let fixture: ComponentFixture<TableXmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableXmComponent, ProjectPipe ],
      imports : [FormsModule, MatSortModule, NgbModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableXmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should sortData to be call and set filterInfo.sort', () => {
    const sort: Sort = {
      active: "ProjectInstanceId",
      direction: "asc"
    };
    component.filterInfo = {};
    component.sortData(sort);
    
    expect(component.filterInfo.sort).toEqual(sort);
  });
    
  it('should onPageChange to be call and set filterInfo.numberPage', () => {
    const num = 2;
    component.filterInfo = {};
    component.onPageChange(2);
    expect(component.filterInfo.numberPage).toEqual(num);
  });
  
  it('should onsearchText to be call ', () => {
    component.filterInfo = {};
    expect(  component.onsearchText(new MouseEvent('click', null))).toBeUndefined();
  });

});
