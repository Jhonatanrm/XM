import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgSelectComponent } from './ng-select.component';
import { SharedModule } from '@shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';

describe('NgSelectComponent', () => {
  let component: NgSelectComponent;
  let fixture: ComponentFixture<NgSelectComponent>;
 
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should onScrollToEnd method increase arrayBuffer  until  arrayList', () => {
    component.onScrollToEnd();
    expect(component.arrayList.length).toEqual(component.arrayBuffer.length);
  });

  it('should onScroll method increase arrayBuffer less or until  arrayList', () => {
    const numberItems : any = component.numberOfItemsFromEndBeforeFetchingMore;
    component.onScroll(numberItems);
    expect(component.arrayList.length).toBeGreaterThanOrEqual(component.arrayBuffer.length);
  });

  it('should onScroll method not increase arrayBuffer if loading field is false', () => {
    const numberItems : any = component.numberOfItemsFromEndBeforeFetchingMore;
    component.loading = false;
    component.onScroll(numberItems);
    expect(component.arrayList.length).toBeGreaterThanOrEqual(component.arrayBuffer.length);
  });

  it('should call writeValue method ', () => {
    const numberItems = 4;
    expect(component.writeValue(numberItems)).toBeUndefined();
  });

  it('should call registerOnChange method and set onChange variable ', () => {
    const numberItems = 4;
    component.registerOnChange(numberItems);
    expect(component.onChange).toEqual(numberItems);
  });

  it('should call registerOnTouched method  ', () => {
    const numberItems = 4;
    expect(component.registerOnTouched(numberItems)).toBeUndefined();
  });

});
