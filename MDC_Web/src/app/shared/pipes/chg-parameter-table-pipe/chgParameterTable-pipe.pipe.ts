import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'chgParameterTablePipe'
})
export class ChgParameterTablePipe implements PipeTransform {
    transform(value: any, ...args: any[]): any {
        if (value) {
            if (value === 'SubstationName') {
                return 'Nombre de Subestación';
            } else if (value === 'XmLatitude') {
                return 'Latitud';
            } else if (value === 'XmLongitude') {
                return 'Longitud';
            } else if (value === 'XmGeographicLocation') {
                return 'Departamento - Municipio';
            } else if (value === 'XMSubAreaID') {
                return 'Área - Subárea';
            } else if (value === 'OwnerAgent') {
                return 'Propietario';
            } else if (value === 'OperatingAgent') {
                return 'Operador';
            } else if (value === 'PowerByDesign') {
                return 'Tensión de diseño (kV)';
            } else if (value === 'NominalCurrentCapacity') {
                return 'Capacidad de corriente nominal (A)';
            } else if (value === 'BusbarName') {
                return 'Nombre de la barra';
            } else if (value === 'XmEncapsulated') {
                return 'Barra encapsulada-GIS';
            } else if (value === 'True') {
                return 'Si';
            } else if (value === 'False') {
                return 'No';
            } else if (value === 'SubstationConfigurationMrid') {
                return 'Subestación - ConfiguracionID (Pendiente)';
            } else {
                return value;
            }
        } else {
            return 'N/A';
        }
    }
}
