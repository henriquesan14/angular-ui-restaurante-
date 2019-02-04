import { Component} from '@angular/core';
import { CategoriaService } from 'src/app/services/domain/categoria.service';
import { Router } from '@angular/router';
import { CategoriaDTO } from 'src/app/models/categoria.dto';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cadastro-categoria',
  templateUrl: './cadastro-categoria.component.html',
  styleUrls: ['./cadastro-categoria.component.css']
})
export class CadastroCategoriaComponent{


  constructor(private mesaService: CategoriaService,
     private router: Router,
     private toastr: ToastrService) { }

  addCategoria(categoria: CategoriaDTO) {
    this.mesaService.insert(categoria)
    .subscribe(() => {
      this.toastr.success('Categoria cadastrada!','Sucesso');
      this.router.navigateByUrl('/dashboard/categorias'); }, 
      (error) => {console.log(error);
      this.toastr.error('Falha no cadastro', 'Falha'); });
  }

}
