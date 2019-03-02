import { Component, OnInit } from '@angular/core';
import { CategoriaDTO } from 'src/app/models/categoria.dto';
import { CategoriaService } from 'src/app/services/domain/categoria.service';

@Component({
  selector: 'app-tipos-categorias',
  templateUrl: './tipos-categorias.component.html',
  styleUrls: ['./tipos-categorias.component.css']
})
export class TiposCategoriasComponent implements OnInit {

  public loader = false;
  categorias: CategoriaDTO[];
  constructor(private categoriaService: CategoriaService) { }

  ngOnInit() {
  }

  findByTipo(tipo: number){
    this.loader = true;
    this.categoriaService.findByTipo(tipo)
    .subscribe( (response) => {this.categorias = response;
      this.loader = false;},
    (error) => {console.log(error); });
  }

  

}
