import { Component} from '@angular/core';
import { CategoriaService } from 'src/app/services/domain/categoria.service';
import { Router } from '@angular/router';
import { CategoriaDTO } from 'src/app/models/categoria.dto';

@Component({
  selector: 'app-cadastro-categoria',
  templateUrl: './cadastro-categoria.component.html',
  styleUrls: ['./cadastro-categoria.component.css']
})
export class CadastroCategoriaComponent{


  constructor(private mesaService: CategoriaService, private router: Router) { }

  addCategoria(categoria: CategoriaDTO) {
    this.mesaService.insert(categoria)
    .subscribe(() => {this.router.navigateByUrl('/dashboard/categorias'); }, (error) => {console.log(error);});
  }

}
