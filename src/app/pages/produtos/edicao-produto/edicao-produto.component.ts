import { Component, OnInit } from '@angular/core';
import { Produto } from 'src/app/models/produto';
import { ProdutoService } from 'src/app/services/domain/produto.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoriaDTO } from 'src/app/models/categoria.dto';

@Component({
  selector: 'app-edicao-produto',
  templateUrl: './edicao-produto.component.html',
  styleUrls: ['./edicao-produto.component.css']
})
export class EdicaoProdutoComponent implements OnInit {

  id: string;
  produto: Produto = <Produto>{};
  constructor(private produtoService: ProdutoService,
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
      this.id = this.activatedRoute.snapshot.params.id;
    this.getProduto(this.activatedRoute.snapshot.params.id);
     }


  ngOnInit() {

  }

  getProduto(id: string){
    this.produtoService.find(id)
    .subscribe((response: Produto) => {this.produto = response; },
    () => {this.toastr.error('Falha ao buscar produto', 'Falha'); });
  }

  updateProduto(produto: Produto){
    this.produtoService.update(produto)
    .subscribe( () => {
      this.toastr.success('Produto atualizado', 'Sucesso');
      this.router.navigateByUrl('dashboard/produtos');
    },
    (error) => {
      this.toastr.error(error.error.message, 'Falha');
    });
  }

}
