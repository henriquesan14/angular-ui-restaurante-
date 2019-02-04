import { Component, OnInit } from '@angular/core';
import { CategoriaDTO } from 'src/app/models/categoria.dto';
import { CategoriaService } from 'src/app/services/domain/categoria.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edicao-categoria',
  templateUrl: './edicao-categoria.component.html',
  styleUrls: ['./edicao-categoria.component.css']
})
export class EdicaoCategoriaComponent implements OnInit {

  public id: string;
  public categoria: CategoriaDTO = <CategoriaDTO>{};
  constructor(private categoriaService: CategoriaService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params.id;
    this.findCategoria(this.activatedRoute.snapshot.params.id);
  }

  findCategoria(id: string){
    this.categoriaService.find(id)
    .subscribe( (response) => {this.categoria = response; },
    (error) => {this.toastr.error('Falha ao carregar categoria', 'Falha'); });
  }

  updateCategoria(categoria: CategoriaDTO) {
    this.categoriaService.update(this.categoria)
    .subscribe( () => {
      this.toastr.success('Categoria atualizada', 'Sucesso');
      this.router.navigateByUrl('dashboard/categorias');
    },
     (error) => {
       this.toastr.error(error.error.message, 'Falha');
     });
  }

}
