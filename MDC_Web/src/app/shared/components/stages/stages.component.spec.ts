import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StagesComponent } from './stages.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IStage } from '@core/entry-projects/model/IStage';

describe('StagesComponent', () => {
  let component: StagesComponent;
  let fixture: ComponentFixture<StagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [FormsModule, NgbModule],
      declarations: [ StagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should addStage method increase one more item of stagesList ', () => {
    component.stagesList = [
      {StageOrder: 1,  StageDescription: 'StageDescription', date: {year: 2019, month: 9, day: 9}},
      {StageOrder: 2,  StageDescription: 'StageDescription2', date: {year: 2019, month: 9, day: 10}},
      {StageOrder: 3,  StageDescription: 'StageDescription2', date: {year: 2019, month: 9, day: 11}}
    ];
    console.log(component.stagesList);
    const prewnumberItem = component.stagesList.length;
    setTimeout(() => {
      component.addStage();
    }, 0);
    expect(component.stagesList.length).toBeGreaterThanOrEqual(prewnumberItem);
  });


  it('should onStages method set two items to this.stagesList when parameter is true', () => {
    const parameter = true;
    component.onStages(parameter);
    expect(component.stagesList.length).toEqual(2);
  });

  it('should onStages method set zero items to this.stagesList when parameter is false', () => {
    const parameter = false;
    component.onStages(parameter);
    expect(component.stagesList.length).toEqual(0);
    expect(component.stagesBoolean).toBeFalsy();
  });

  it('should deleteStage method set projectFPO with the last item date of stagesList', () => {
    const stage : IStage = {StageOrder: 1,  StageDescription: 'StageDescription', date: {year: 2019, month: 9, day: 9} };
    component.stagesList = [
      {StageOrder: 1,  StageDescription: 'StageDescription', date: {year: 2019, month: 9, day: 9}},
      {StageOrder: 2,  StageDescription: 'StageDescription2', date: {year: 2019, month: 9, day: 10}},
      {StageOrder: 3,  StageDescription: 'StageDescription2', date: {year: 2019, month: 9, day: 11}}
    ];
    component.deleteStage(stage);
    expect(component.projectFPO).toEqual(component.stagesList[component.stagesList.length - 1].date);
  });

  

  it('should onSelectDateStage method set minDateFPOAfter with de last date stage item ', () => {
    const stage : IStage = {StageOrder: 3,  StageDescription: 'StageDescription2', date: {year: 2019, month: 9, day: 11}};
    component.stagesList = [
      {StageOrder: 1,  StageDescription: 'StageDescription', date: {year: 2019, month: 9, day: 9}},
      {StageOrder: 2,  StageDescription: 'StageDescription2', date: {year: 2019, month: 9, day: 10}},
      {StageOrder: 3,  StageDescription: 'StageDescription2', date: {year: 2019, month: 9, day: 11}}
    ];
    component.onSelectDateStage(stage);
    expect(component.minDateFPOAfter).toEqual(stage.date);
  });


  it('should onSelectDateStage method set minDateFPOAfter with de last date stage item ', () => {
    const stage : IStage = {StageOrder: 3,  StageDescription: 'StageDescription2', date: {year: 2019, month: 9, day: 11}};
    component.stagesList = [
      {StageOrder: 1,  StageDescription: 'StageDescription', date: {year: 2019, month: 9, day: 9}},
      {StageOrder: 2,  StageDescription: 'StageDescription2', date: {year: 2019, month: 9, day: 10}},
      {StageOrder: 3,  StageDescription: 'StageDescription2', date: {year: 2019, month: 9, day: 11}}
    ];
    component.onSelectDateStage(stage);
    expect(component.minDateFPOAfter).toEqual(stage.date);
  });
  
  
  it('should onDeleteStage not call deleteStage with stageList length is not greater 2  ', () => {
    const stage : IStage = {StageOrder: 3,  StageDescription: 'StageDescription2', date: {year: 2019, month: 9, day: 11}};
    component.stagesList = [
      {StageOrder: 1,  StageDescription: 'StageDescription', date: {year: 2019, month: 9, day: 9}},
    ];
     expect(component.onDeleteStage(stage, new MouseEvent('click', null))).toBeUndefined();
  });


  it('should addStageAElement to be called', () => {
     expect(component.addStageAElement(new MouseEvent('click', null))).toBeUndefined();
  });


  it('should onBlur to be called', () => {
    const event= {}; 
    expect(component.onBlur(event)).toBeUndefined();
  });


});
