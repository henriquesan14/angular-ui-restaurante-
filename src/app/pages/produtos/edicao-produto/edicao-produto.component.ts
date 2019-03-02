import { Component, OnInit } from '@angular/core';
import { Produto } from 'src/app/models/produto';
import { ProdutoService } from 'src/app/services/domain/produto.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edicao-produto',
  templateUrl: './edicao-produto.component.html',
  styleUrls: ['./edicao-produto.component.css']
})
export class EdicaoProdutoComponent implements OnInit {

  public loader = false;
  id: string;
  produto: Produto = <Produto>{};
  constructor(private produtoService: ProdutoService,
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
      
     }


  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params.id;
    this.getProduto(this.activatedRoute.snapshot.params.id);
  }

  getProduto(id: string){
    this.loader = true;
    this.produtoService.find(id)
    .subscribe((response: Produto) => {this.produto = response;
    this.loader = false; },
    () => {this.toastr.error('Falha ao buscar produto', 'Falha');
    this.loader = false; });
  }

  updateProduto(produto: Produto){
    this.produtoService.update(produto)
    .subscribe( () => {
      this.toastr.success('Produto atualizado', 'Sucesso');
      this.router.navigateByUrl('dashboard/produtos');
    },
    (error) => {
      if (error.error.errors){
        for (const err of error.error.errors){
          this.toastr.error(err.message, 'Falha');
        }
       } else {
        this.toastr.error(error.error.message, 'Falha');
       }
    });
  }

}
