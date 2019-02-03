import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/services/domain/categoria.service';
import { CategoriaDTO } from 'src/app/models/categoria.dto';

@Component({
  selector: 'app-listagem-categorias',
  templateUrl: './listagem-categorias.component.html',
  styleUrls: ['./listagem-categorias.component.css']
})
export class ListagemCategoriasComponent implements OnInit {

  categorias: CategoriaDTO[];
  constructor(private categoriaService: CategoriaService) { }

  ngOnInit() {
    this.findAll();
  }

  findAll(){
    this.categoriaService.findAll()
    .subscribe((response: CategoriaDTO[]) => {this.categorias = response; },
     () => {});
  }

  existemCategorias(): boolean {
    return this.categorias && this.categorias.length > 0;
  }

}
