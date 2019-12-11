import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ObjectUnsubscribedError } from 'rxjs';

@Component({
  selector: 'app-validate',
  templateUrl: './validate.component.html'
})
export class ValidateComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() group: string;
  @Input() array?: string;
  @Input() subgroup?: string;
  @Input() name: string;
  @Input() switch: string;
  @Input() n: number;

  constructor() { }

  ngOnInit() {
  }

  // Para retorna r la clase validadora de un campo en un formulario
  // el control es para los que vienen por solucitud de cambio
  getValidClass(form: FormGroup, group: string, name: string, control?: boolean) {
    if (form.get(group).get(name).status !== 'DISABLED') {

      if ((
        form.get(group).get(name).touched || form.get(group).get(name).dirty) &&
        !form.get(group).get(name).valid) {
        return 'is-invalid';
      } else {
        if (
          form.get(group).get(name).touched &&
          form.get(group).get(name).dirty &&
          form.get(group).get(name).valid) {
          return !control ? 'is-valid' : '';
        }
      }
    }
    return ''; // importante no puede retornal null para ngClass = []
  }

  getValidClassNoRequire(form: FormGroup, group: string, name: string) {
    if (form.get(group).get(name).status !== 'DISABLED') {

      if ((
        form.get(group).get(name).touched || form.get(group).get(name).dirty) &&
        !form.get(group).get(name).valid) {
        return 'is-invalid';
      } else {
        if (
          form.get(group).get(name).touched &&
          form.get(group).get(name).dirty &&
          form.get(group).get(name).valid) {
            // return 'is-valid';
          }
      }
    }
    return ''; // importante no puede retornal null para ngClass = []
  }

  getSubValidClass(form: FormGroup, group: string, subgroup: string, subsubgroup: string, name: string) {
    if (form.get(group).get(subgroup).get('' + subsubgroup).get(name).status !== 'DISABLED') {
      // tslint:disable-next-line: max-line-length
      if ((form.get(group).get(subgroup).get('' + subsubgroup).get(name).touched || form.get(group).get(subgroup).get('' + subsubgroup).get(name).dirty) && !form.get(group).get(subgroup).get('' + subsubgroup).get(name).valid) {
        return 'is-invalid';
      } else {
        // tslint:disable-next-line: max-line-length
        if (form.get(group).get(subgroup).get('' + subsubgroup).get(name).touched && form.get(group).get(subgroup).get('' + subsubgroup).get(name).dirty && form.get(group).get(subgroup).get('' + subsubgroup).get(name).valid) {
          return 'is-valid';
        }
      }
    }
    return ''; // importante no puede retornal null para ngClass = []
  }

  getValidClassGroup(form: FormGroup, group: string) {

    if ((form.get(group).touched || form.get(group).dirty) && !form.get(group).valid) {
      return 'is-invalid';
    } else {
      if (form.get(group).touched && form.get(group).dirty && form.get(group).valid) {
        return 'is-valid';
      }
    }
  }

  getValidDecimalNumber(form: FormGroup, group: string, name: string, n: number) {
    if (form.get(group).get(name).status !== 'DISABLED') {

      if ((
        form.get(group).get(name).touched || form.get(group).get(name).dirty) &&
        !form.get(group).get(name).valid ||
        form.get(group).get(name).value.toString().length > (n + 1)
      ) {
        return 'is-invalid';
      } else {
        if (
          form.get(group).get(name).touched &&
          form.get(group).get(name).dirty &&
          form.get(group).get(name).valid) {
          return 'is-valid';
        }
      }

    }
  }

  getValidSubDecimalNumber(form: FormGroup, group: string, subgroup: string, subsubgroup: string, name: string, n: number) {
    const input = form.get(group).get(subgroup).get('' + subsubgroup).get(name) as FormControl;
    if (input.status !== 'DISABLED') {
      // priemro si es diferente de ""
      if (input.value !== null && input.value !== '') {

        const re = new RegExp('^[0-9]+(\.[0-9]+)?$');
        // segundo la forma
        if (re.test(input.value)) {
          let int = parseInt(input.value, 0);
          int = int.toString().length;
          const nn = n + int;
          if (int < 0 || int > 3) { return 'is-invalid'; }

          if ((
            input.touched || input.dirty) && !input.valid || input.value.toString().length > (nn)
          ) {
            return 'is-invalid';
          } else {
            if (
              input.touched && input.dirty && input.valid) {
              // return 'is-valid';
            }
          }
        } else {
          const reneg = new RegExp('^-[0-9]+(\.[0-9]+)?$');
          if (reneg.test(input.value)) {
            return 'is-invalid';
          }
        }
      } else {
        if (input.value === null) {
          return 'is-invalid';
        }
      }

    }
  }

  // Maximo dos Enteros y seix decimales
  getValidDecimalNumberTowForSix(form: FormGroup, group: string, name: string, n: number) {

    if (form.get(group).get(name).status !== 'DISABLED' && form.get(group).get(name).value !== null) {

      if (Number.isInteger(parseInt(form.get(group).get(name).value.toString().split('.')[0], 0))) {
        // dos validaciones
        let nn = n;
        if (form.get(group).get(name).value < 0) {
          nn = n + 1;
        }

        let int = parseInt(form.get(group).get(name).value, 0);
        if (int < 0) { int = int * -1; }
        int = int.toString().length;

        // 1. un solo entero
        if (int > 2) {
          return 'is-invalid';
        }

        if (int === 1 || int === 0) {
          if (
            (form.get(group).get(name).touched || form.get(group).get(name).dirty) &&
            !form.get(group).get(name).valid ||
            form.get(group).get(name).value.toString().length > (nn + 1)
          ) {
            return 'is-invalid';
          } else {
            if (form.get(group).get(name).touched && form.get(group).get(name).dirty && form.get(group).get(name).valid) {
              // return 'is-valid';
            }
          }
        } else {
          if (int === 2) {
            if (
              (form.get(group).get(name).touched || form.get(group).get(name).dirty) &&
              !form.get(group).get(name).valid ||
              form.get(group).get(name).value.toString().length > (nn + 2)
            ) {
              return 'is-invalid';
            } else {
              if (form.get(group).get(name).touched && form.get(group).get(name).dirty && form.get(group).get(name).valid) {
                // return 'is-valid';
              }
            }
          }
        }

        if (
          (form.get(group).get(name).touched || form.get(group).get(name).dirty) &&
          !form.get(group).get(name).valid
        ) {
          return 'is-invalid';

        } else {
          if (form.get(group).get(name).touched && form.get(group).get(name).dirty && form.get(group).get(name).valid) {
            // return 'is-valid';
          }
        }

      }
    }
    if (form.get(group).get(name).value === null) {
      return 'is-invalid';
    }
  }

  // Maximo tres Enteros y seix decimales
  getValidDecimalNumberTreeForSix(form: FormGroup, group: string, name: string, n: number) {

    if (form.get(group).get(name).status !== 'DISABLED' && form.get(group).get(name).value !== null) {

      if (Number.isInteger(parseInt(form.get(group).get(name).value.toString().split('.')[0], 0))) {
        let nn = n;
        if (form.get(group).get(name).value < 0) {
          nn = n + 1;
        }
        // dos validaciones
        let int = parseInt(form.get(group).get(name).value, 0);
        if (int < 0) { int = int * -1; }
        int = int.toString().length;
        // 1. un solo entero
        if (int > 3) {
          return 'is-invalid';
        }
        if (int === 1 || int === 0) {
          if (
            (form.get(group).get(name).touched || form.get(group).get(name).dirty) &&
            !form.get(group).get(name).valid ||
            form.get(group).get(name).value.toString().length > (nn + 1)
          ) {
            return 'is-invalid';
          } else {
            if (form.get(group).get(name).touched && form.get(group).get(name).dirty && form.get(group).get(name).valid) {
              // return 'is-valid';
            }
          }
        } else {
          if (int === 2) {
            if (
              (form.get(group).get(name).touched || form.get(group).get(name).dirty) &&
              !form.get(group).get(name).valid ||
              form.get(group).get(name).value.toString().length > (nn + 2)
            ) {
              return 'is-invalid';
            } else {
              if (form.get(group).get(name).touched && form.get(group).get(name).dirty && form.get(group).get(name).valid) {
                // return 'is-valid';
              }
            }
          } else {
            if (int === 3) {
              if (
                (form.get(group).get(name).touched || form.get(group).get(name).dirty) &&
                !form.get(group).get(name).valid ||
                form.get(group).get(name).value.toString().length > (nn + 3)
              ) {
                return 'is-invalid';
              } else {
                if (form.get(group).get(name).touched && form.get(group).get(name).dirty && form.get(group).get(name).valid) {
                  // return 'is-valid';
                }
              }
            }
          }
        }

        if (
          (form.get(group).get(name).touched || form.get(group).get(name).dirty) &&
          !form.get(group).get(name).valid
        ) {

          return 'is-invalid';

        } else {
          if (form.get(group).get(name).touched && form.get(group).get(name).dirty && form.get(group).get(name).valid) {
            // return 'is-valid';
          }
        }
      }
    }
    if (form.get(group).get(name).value === null) {
      return 'is-invalid';
    }
  }

  // Maximo tres Enteros y dos decimales
  getValidDecimalNumberTreeForTow(form: FormGroup, group: string, name: string, n: number) {
    const re = new RegExp('^[0-9]+(\.[0-9]+)?$');
    if (re.test(form.get(group).get(name).value) && form.get(group).get(name).value !== null) {
      let int = parseInt(form.get(group).get(name).value, 0);
      int = int.toString().length;
      const nn = n + int;
      if (int < 0 || int > 3) { return 'is-invalid'; }

      if (
        (form.get(group).get(name).touched || form.get(group).get(name).dirty) &&
        !form.get(group).get(name).valid ||
        form.get(group).get(name).value.toString().length > (nn)
      ) {
        return 'is-invalid';
      } else {
        if (
          form.get(group).get(name).touched &&
          form.get(group).get(name).dirty &&
          form.get(group).get(name).valid) {
          // return 'is-valid';
        }
      }
    } else {
      const reneg = new RegExp('^-[0-9]+(\.[0-9]+)?$');
      if (reneg.test(form.get(group).get(name).value)) {
        return 'is-invalid';
      }
      if (form.get(group).get(name).value === null) {
        return 'is-invalid';
      }
    }

  }

  // Maximo cinco Enteros y dos decimales
  getValidDecimalNumberFiveForTow(form: FormGroup, group: string, name: string, n: number) {
    const re = new RegExp('^[0-9]+(\.[0-9]+)?$');
    if (re.test(form.get(group).get(name).value) && form.get(group).get(name).value !== null) {
      let int = parseInt(form.get(group).get(name).value, 0);
      int = int.toString().length;
      const nn = n + int;
      if (int < 0) { return 'is-invalid'; }
      if (int > 5) { return 'is-invalid'; }

      if (
        (form.get(group).get(name).touched || form.get(group).get(name).dirty) &&
        !form.get(group).get(name).valid ||
        form.get(group).get(name).value.toString().length > (nn)
      ) {
        return 'is-invalid';
      } else {
        if (
          form.get(group).get(name).touched &&
          form.get(group).get(name).dirty &&
          form.get(group).get(name).valid) {
          // return 'is-valid';
        }
      }
    } else {
      const reneg = new RegExp('^-[0-9]+(\.[0-9]+)?$');
      if (reneg.test(form.get(group).get(name).value)) {
        return 'is-invalid';
      }

      if (form.get(group).get(name).value === null) {
        return 'is-invalid';
      }
    }
  }

  // ELEMENTOS

  errorsRequiredGroup() {
    if (!this.form.get(this.group).valid) {
      return true;
    }
    return false;
  }

  // ELEMENTOS DE PRIMER NIVEL
  errorsRequired() {
    if (this.form.get(this.group).get(this.name).errors) {
      return this.form.get(this.group).get(this.name).errors.required;
    }
    return false;
  }

  errorsMin() {
    if (this.form.get(this.group).get(this.name).errors) {
      if ('min' in this.form.get(this.group).get(this.name).errors) {
        return this.form.get(this.group).get(this.name).errors.min;
      }
    }
    if (this.form.get(this.group).get(this.name).errors) {
      if ('minlength' in this.form.get(this.group).get(this.name).errors) {
        return this.form.get(this.group).get(this.name).errors.minlength;
      }
    }
    return false;
  }

  errorsMax() {
    if (this.form.get(this.group).get(this.name).errors) {
      if ('max' in this.form.get(this.group).get(this.name).errors) {
        return this.form.get(this.group).get(this.name).errors.max;
      }
    }

    if (this.form.get(this.group).get(this.name).errors) {
      if ('maxlength' in this.form.get(this.group).get(this.name).errors) {
        return this.form.get(this.group).get(this.name).errors.maxlength;
      }
    }
    return false;
  }

  errorsMaxDecimals() {
    if (this.form.get(this.group).get(this.name).value) {
      if (this.form.get(this.group).get(this.name).value.toString().length > (this.n - 1)) {
        return '.';
      }
      return false;
    }
    return;
  }

  errorsChildMaxDecimals() {
    const input = this.form.get(this.group).get(this.array).get('' + this.subgroup).get(this.name) as FormControl;

    if (input.value !== null && input.value !== '') {

      const re = new RegExp('^[0-9]+(\.[0-9]+)?$');
      // segundo la forma
      if (re.test(input.value)) {
        let int = parseInt(input.value, 0);
        int = int.toString().length;
        const nn = +this.n + int;
        if (int < 0 || int > 3) { return '.'; }

        if ((
          input.touched || input.dirty) && !input.valid || input.value.toString().length > (nn)
        ) {
          return '.';
        } else {
          if (
            input.touched && input.dirty && input.valid) {
            // return 'is-valid';
          }
        }
      } else {
        const reneg = new RegExp('^-[0-9]+(\.[0-9]+)?$');
        if (reneg.test(input.value)) {
          return '.';
        }
      }
    }
  }

  // ELEMENTOS DE SEGUNDO NIVEL
  errorsRequiredChild() {
    if (this.form.get(this.group).get(this.array).get('' + this.subgroup).get(this.name).errors) {
      return this.form.get(this.group).get(this.array).get('' + this.subgroup).get(this.name).errors.required;
    }
    return false;
  }
}
