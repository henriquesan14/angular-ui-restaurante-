import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Produto } from 'src/app/models/produto';
import { CategoriaService } from 'src/app/services/domain/categoria.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form-produto',
  templateUrl: './form-produto.component.html',
  styleUrls: ['./form-produto.component.css']
})
export class FormProdutoComponent implements OnInit {

  constructor(public categoriaService: CategoriaService,
     private formBuilder: FormBuilder,
     private toastr: ToastrService){}

  public formCategoria: FormGroup;
  title: string;
  btn: string;
  @Input() produto: Produto = <Produto>{};
  @Input() id: number;
  @Output() outputProduto: EventEmitter<Produto> = new EventEmitter();


  public numberMask = createNumberMask({
    prefix: '',
    suffix: '',
    includeThousandsSeparator: false,
    thousandsSeparatorSymbol: '.',
    allowDecimal: true,
    decimalSymbol: '.',
    decimalLimit: 2,
    integerLimit: 4,
    requireDecimal: false,
    allowNegative: false,
    allowLeadingZeroes: false
  });

  onSubmit() {
    this.outputProduto.emit(this.produto);
  }

  comparaCategoria(obj1, obj2) {
    return obj1 && obj2 ? (obj1.id === obj2.id) : obj1 === obj2;
  }

  ngOnInit() {
    this.atualizarCategorias();
    this.configuraForm();
    if (this.id === undefined){
      this.title = 'Novo Produto';
      this.btn = 'Cadastrar';
    } else {
      this.title = 'Editar Produto';
      this.btn = 'Editar';
    }
  }

  configuraForm(){
    this.formCategoria = this.formBuilder.group({
      nome: [null, Validators.required],
      tipoCategoria: [null, Validators.required]
    });
  }



  atualizarCategorias() {
    this.categoriaService.atualizarCategorias()
      .subscribe(
        () => { },
        () => {
          this.toastr.error('Falha ao atualizar listagem de linguagens.', 'Falha!');
        });
  }

  addCategoria() {
    this.categoriaService.insert(this.formCategoria.value)
    .subscribe(() => {
      this.formCategoria.reset();
      this.atualizarCategorias();
      this.toastr.success('Categoria cadastrada!', 'Sucesso'); },
    (error) => {this.toastr.error(error.error.message, 'Falha'); });
  }

}
