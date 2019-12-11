import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { IStage, Stage } from '@core/entry-projects/model/IStage';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Util } from '@shared/util';
import { MessageService } from '@shared/services/message.service';
import { SweetAlertResult } from 'sweetalert2';
import { IStageFormModel } from './model-form/stage-form.model';

@Component({
  selector: 'xm-stages',
  templateUrl: './stages.component.html',
  styleUrls: ['./stages.component.scss']
})
export class StagesComponent implements OnInit {


  @Input() public minDateFPOAfter;

  @Input() public stagesList: IStage[];

  @Input() public maxDate;

  @Input() public stagesBoolean = false;

  @Input() public submitFather = false;

  @Output() public modelFormEmitter = new EventEmitter<IStageFormModel>();

  public modelForm: IStageFormModel = {};

  public currentDate;

  public projectFPO: NgbDateStruct;




  constructor(
    private messageService: MessageService
  ) {
    this.currentDate = Util.getActualDay();
    this.stagesList = [new Stage(), new Stage()];
  }

  ngOnInit() {
  }



  onStages(event: boolean) {
    this.minDateFPOAfter = Util.getActualDay();
    if (event) {
      this.stagesList = [new Stage(), new Stage()];
      this.modelForm.validForm = false;
      this.emitMessage(); 
    } else {
      if (this.validateEmptyStages()) {
        this.messageService.openGeneralConfirm("¿Esta seguro que el proyecto no tiene más de una etapa?")
          .then((value: SweetAlertResult) => {
            if (value.value) {
              this.eventNotStages();
            } else {
              this.stagesBoolean = true;
            }
          });
      } else {
        this.eventNotStages();

      }
    }
  }

  private eventNotStages() {
    this.stagesBoolean = false;
    this.stagesList = [];
    this.projectFPO = null;
    this.modelFormEmitter.emit(null);
  }


  onSelectDateStage(stage: IStage) {
    if (stage === this.stagesList[this.stagesList.length - 1]) {
      // se modifica la fecha final de las etapas
      this.minDateFPOAfter = stage.date;
      this.projectFPO = this.minDateFPOAfter;
      this.emitMessage();
    } else {
      // se modifica una fecha que no sea la final
      this.minDateFPOAfter = stage.date;
    }
  }


  private validateEmptyStages(): boolean {
    let stageInfo = false;
    for (let item of this.stagesList) {
      if (item.StageDescription != null || item.date != null) {
        stageInfo = true;
      }
    }
    return stageInfo;
  }

  addStageAElement(event: any) {
    event.preventDefault();
    this.addStage();
  }


  // crea una nueva etapa, Ok unit test
  addStage() {
    this.stagesList = this.stagesList.concat([new Stage()]);
    console.log(this.stagesList);
    const tempList = Object.assign([], this.stagesList);
    this.stagesList = [];
    setTimeout(() => {
      this.stagesList = Object.assign([], tempList);
      this.emitMessage();
    }, 0);
  }

  onBlur($event: any) {
    this.emitMessage();
  }


  private validFormStages(): boolean {

    for (let item of this.stagesList) {
      if ((item.StageDescription == null || item.StageDescription === '')
        || (item.date == null || item.date.year.toString() === '')) {
        return false;
      }
    }
    return true;
  }


  onDeleteStage(stage: IStage, event: any) {
    console.log(event);
    event.preventDefault();
    if (this.stagesList.length > 2) {
      this.messageService.openGeneralConfirm("¿Esta seguro de eliminar la etapa?")
        .then((value: SweetAlertResult) => {
          console.log(value);
          if (value.value) {
            this.deleteStage(stage);
          }
        });
    }
  }

  //ok unit test
  deleteStage(stage: IStage) {

    const stagesListAux = this.stagesList.filter(item => item !== stage);
    this.stagesList = null;
    this.stagesList = stagesListAux;
    this.projectFPO = this.stagesList[this.stagesList.length - 1].date;
    this.emitMessage();

  }


  private emitMessage() {
    this.modelForm.projectFPO = this.projectFPO;
    this.modelForm.stages = this.stagesList;

    this.modelForm.validForm = this.validFormStages();

    console.log('stages');
    console.log(this.modelForm);
    this.modelFormEmitter.emit(this.modelForm);
  }






}
