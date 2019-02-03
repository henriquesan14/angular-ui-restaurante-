import { Component, OnInit, ViewChild } from '@angular/core';
import { ProdutoService } from 'src/app/services/domain/produto.service';
import { ProdutoDTO, PageProduto } from 'src/app/models/produto.dto';

@Component({
  selector: 'app-listagem-produtos',
  templateUrl: './listagem-produtos.component.html',
  styleUrls: ['./listagem-produtos.component.css']
})
export class ListagemProdutosComponent implements OnInit {

  produtos: ProdutoDTO[];
  pageProdutos: PageProduto = <PageProduto>{};
  nome;
  page;
  orderBy;

  constructor(private produtoService: ProdutoService) { }

  ngOnInit() {
    this.findAll(this.nome, this.page);
  }

  totalPages() {
    const pages = [];
    for( let i = 0; i < this.pageProdutos.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  findAll(nome: string = '', page: number = 0, orderBy = 'nome', linesporPage: number = 5) {
    this.produtoService.findAll(nome, page, orderBy, linesporPage)
    .subscribe(
      (response: PageProduto) => {
        this.produtos = response.content; this.pageProdutos = response; }
    );
  }

  existemProdutos(): boolean {
    return this.produtos && this.produtos.length > 0;
  }

  trocarOrder(order: string) {
    this.orderBy = order;
    this.findAll(this.nome, this.pageProdutos.number, order);
  }

}
