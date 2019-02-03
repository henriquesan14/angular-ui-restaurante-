import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Produto } from 'src/app/models/produto';
import { CategoriaService } from 'src/app/services/domain/categoria.service';
import { CategoriaDTO } from 'src/app/models/categoria.dto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form-produto',
  templateUrl: './form-produto.component.html',
  styleUrls: ['./form-produto.component.css']
})
export class FormProdutoComponent implements OnInit {

  constructor(private categoriaService: CategoriaService,
     private formBuilder: FormBuilder,
     private toastr: ToastrService){}

  public formCategoria: FormGroup;
  title: string;
  categorias: CategoriaDTO[] = <CategoriaDTO[]>[];
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

  ngOnInit() {
    this.configuraForm();
    this.findCategorias();
    if (this.id === undefined){
      this.title = 'Novo Produto';
    } else {
      this.title = 'Editar Produto';
    }
  }

  configuraForm(){
    this.formCategoria = this.formBuilder.group({
      nome: [null, Validators.required],
      tipoCategoria: [null, Validators.required]
    });
  }

  findCategorias(){
    this.categoriaService.findAll()
    .subscribe((response: CategoriaDTO[]) => {
      this.categorias = response; });
  }

  addCategoria() {
    this.categoriaService.insert(this.formCategoria.value)
    .subscribe(() => {
      this.formCategoria.reset();
      this.findCategorias();
      this.toastr.success('Categoria cadastrada!', 'Sucesso'); },
    (error) => {this.toastr.error(error.error.message, 'Falha'); });
  }

}
