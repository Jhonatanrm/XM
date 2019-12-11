import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProject } from '@core/entry-projects/model/IProject';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons, NgbTab } from '@ng-bootstrap/ng-bootstrap';
import { ActivosGeneracionService } from '@shared/services/proyect-entry/activos-generacion.service';

@Component({
    selector: 'app-activos',
    templateUrl: './activos-generacion.component.html'
})
export class ActivosGeneracionComponent implements OnInit, AfterViewInit {

    // @ViewChild('modalFormPlanta', { static: false }) modal: ElementRef;
    project: IProject;
    closeResult: string;
    tituloPlanta: string;
    ListTypePlant: {} = {
        1: 'Solar',
        2: 'Térmica',
        3: 'Eólica'
    };

    plantForm = new FormGroup({
        id: new FormControl(''),
        name: new FormControl('', Validators.required),
        project_id: new FormControl(''),
    });

    constructor(
        private route: ActivatedRoute,
        private activosService: ActivosGeneracionService,
        private modalService: NgbModal) {
    }

    ngOnInit() {
        this.getProject();
    }

    ngAfterViewInit() {
        this.plantForm.patchValue({
            project_id: this.project.iProjectRIDd
        });
    }

    getProject() {
        const id = +this.route.snapshot.paramMap.get('id');
        // se realiza la consulta
        this.project = this.activosService.getProject(id);
        // this.project.Planta = this.activosService.getPlanta(this.project.id);

        // titulo de planta
        this.setTituloPlanta();
    }

    setTituloPlanta() {
        // this.tituloPlanta = this.ListTypePlant[this.project.type_generation_resource];
    }


    // modal de Formulario Planta
    openModalForm(modal) {
        this.modalService.open(modal, {
            ariaLabelledBy: 'modal-basic-title',
            size: 'lg',
            backdropClass: 'light-blue-backdrop'
        }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }

    // tabs
    activosTabChange(evt: any): void {
        console.log('project change tab ' + evt);
    }

    onSubmit() {
        console.log(this.plantForm.value);
    }

}
