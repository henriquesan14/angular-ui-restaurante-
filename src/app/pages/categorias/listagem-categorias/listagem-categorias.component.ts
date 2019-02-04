import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/services/domain/categoria.service';
import { CategoriaDTO } from 'src/app/models/categoria.dto';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listagem-categorias',
  templateUrl: './listagem-categorias.component.html',
  styleUrls: ['./listagem-categorias.component.css']
})
export class ListagemCategoriasComponent implements OnInit {

  categorias: CategoriaDTO[];
  id: string;
  constructor(private categoriaService: CategoriaService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.findAll();
  }

  trocaId(id: string){
    this.id = id;
  }

  findAll(){
    this.categoriaService.findAll()
    .subscribe((response: CategoriaDTO[]) => {this.categorias = response; },
     () => {});
  }

  deletaCategoria(){
    this.categoriaService.delete(this.id)
    .subscribe(() => {
      this.toastr.success('Categoria apaga!', 'Sucesso');
      this.findAll();
    },
    (error) => {
      console.log(error);
      this.toastr.error(error.error.message, 'Falha');
    });
  }

  existemCategorias(): boolean {
    return this.categorias && this.categorias.length > 0;
  }

}
