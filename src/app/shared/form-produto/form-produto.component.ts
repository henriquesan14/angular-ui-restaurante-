import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Produto } from 'src/app/models/produto';
import { CategoriaService } from 'src/app/services/domain/categoria.service';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { ToastrService } from 'ngx-toastr';
import { CategoriaDTO } from 'src/app/models/categoria.dto';

@Component({
  selector: 'app-form-produto',
  templateUrl: './form-produto.component.html',
  styleUrls: ['./form-produto.component.css']
})
export class FormProdutoComponent implements OnInit {

  constructor(public categoriaService: CategoriaService,
     private toastr: ToastrService){}

  title: string;
  btn: string;
  @Input() loader = false;
  @Input() produto: Produto = <Produto>{};
  @Input() id: number;
  @Output() outputProduto: EventEmitter<Produto> = new EventEmitter();
  categorias: CategoriaDTO[];
  public categoria: CategoriaDTO = <CategoriaDTO>{};

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

  findAll(){
    this.categoriaService.findAll()
    .subscribe((response) => {this.categorias = response;});
  }

  ngOnInit() {
    this.findAll();
    
    if (this.id === undefined){
      this.title = 'Novo Produto';
      this.btn = 'Cadastrar';
    } else {
      this.title = 'Editar Produto';
      this.btn = 'Editar';
    }
  }



  addCategoria() {
    this.categoriaService.insert(this.categoria)
    .subscribe(() => {
      this.categoria = <CategoriaDTO>{};
      this.findAll();
      this.toastr.success('Categoria cadastrada!', 'Sucesso'); },
    (error) => {this.toastr.error(error.error.message, 'Falha'); });
  }

}
