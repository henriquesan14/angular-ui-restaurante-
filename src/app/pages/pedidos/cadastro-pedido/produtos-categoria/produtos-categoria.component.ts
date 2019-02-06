import { Component, OnInit } from '@angular/core';
import { ProdutoDTO, PageProduto } from 'src/app/models/produto.dto';
import { ProdutoService } from 'src/app/services/domain/produto.service';
import { ActivatedRoute } from '@angular/router';
import { CategoriaService } from 'src/app/services/domain/categoria.service';

@Component({
  selector: 'app-produtos-categoria',
  templateUrl: './produtos-categoria.component.html',
  styleUrls: ['./produtos-categoria.component.css']
})
export class ProdutosCategoriaComponent implements OnInit {

  produtos: ProdutoDTO[];
  pageProdutos: PageProduto = <PageProduto>{};
  nome;
  page;
  orderBy;
  idCategoria: string;
  nomeCategoria: string;
  constructor(private produtoService: ProdutoService,
    private activatedRoute: ActivatedRoute,
    private categoriaService: CategoriaService) { }

  ngOnInit() {
    this.findCategoria(this.activatedRoute.snapshot.params.idCategoria);
    this.idCategoria = this.activatedRoute.snapshot.params.idCategoria;
    this.findAll(this.activatedRoute.snapshot.params.idCategoria);
  }

  totalPages() {
    const pages = [];
    for( let i = 0; i < this.pageProdutos.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  findAll(idCategoria: string, nome: string = '', page: number = 0, orderBy = 'nome', linesporPage: number = 5) {
    this.produtoService.findByCategoria(idCategoria, nome, page, orderBy, linesporPage)
    .subscribe(
      (response: PageProduto) => {
        this.produtos = response.content; this.pageProdutos = response;
      }
    );
  }

  findCategoria(id: string){
    this.categoriaService.find(id)
    .subscribe((response) => {this.nomeCategoria = response.nome; },
    (error) => {console.log(error);});
  }

  existemProdutos(): boolean {
    return this.produtos && this.produtos.length > 0;
  }

  trocarOrder(order: string) {
    this.orderBy = order;
    this.findAll(this.idCategoria, this.nome, this.pageProdutos.number, order);
  }

}
