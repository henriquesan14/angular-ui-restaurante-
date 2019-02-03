import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-endereco',
  templateUrl: './form-endereco.component.html',
  styleUrls: ['./form-endereco.component.css']
})
export class FormEnderecoComponent implements OnInit {

  @Input() formEnd: FormGroup = <FormGroup>{};
  @Output() outputEndereco: EventEmitter<FormGroup> = new EventEmitter();
  public maskCep = [ /[0-9]/, /\d/, /\d/, /\d/, /\d/ , '-', /\d/, /\d/, /\d/];
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.configuraFormEnd();
  }

  onSubmit() {
    this.outputEndereco.emit(this.formEnd);
  }

  configuraFormEnd() {
    this.formEnd = this.formBuilder.group({
      logradouro: [null, Validators.required],
      numero: [null, Validators.required],
      bairro: [null, Validators.required],
      complemento: [''],
      cep: [null, [Validators.maxLength(9), Validators.minLength(9), Validators.required]]
    });
  }

}
