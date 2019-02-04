import { Component, OnInit, ViewChild } from '@angular/core';
import { ProdutoService } from 'src/app/services/domain/produto.service';
import { ProdutoDTO, PageProduto } from 'src/app/models/produto.dto';
import { ToastrService } from 'ngx-toastr';

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
  id: string;

  constructor(private produtoService: ProdutoService,
    private toastr: ToastrService) { }

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

  trocaId(id: string){
    this.id = id;
  }

  deletaProduto(){
    this.produtoService.delete(this.id)
    .subscribe( () => {
      if(this.pageProdutos.numberOfElements === 1){
        this.findAll(this.nome, this.pageProdutos.number - 1, this.orderBy);
      } else {
        this.findAll(this.nome, this.pageProdutos.number, this.orderBy);
      }
      this.toastr.success('Produto apagado', 'Sucesso'); },
    (error) => {
      this.toastr.error(error.error.message, 'Falha');
    });
  }

}
