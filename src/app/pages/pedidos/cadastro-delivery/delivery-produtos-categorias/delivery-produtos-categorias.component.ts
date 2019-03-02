import { Component, OnInit } from '@angular/core';
import { Produto, PageProduto2 } from 'src/app/models/produto';
import { ProdutoService } from 'src/app/services/domain/produto.service';
import { ActivatedRoute } from '@angular/router';
import { CategoriaService } from 'src/app/services/domain/categoria.service';
import { ToastrService } from 'ngx-toastr';
import { CartDeliveryService } from 'src/app/services/domain/cart-delivery.service';

@Component({
  selector: 'app-delivery-produtos-categorias',
  templateUrl: './delivery-produtos-categorias.component.html',
  styleUrls: ['./delivery-produtos-categorias.component.css']
})
export class DeliveryProdutosCategoriasComponent implements OnInit {

  public loader = false;
  produtos: Produto[];
  pageProdutos: PageProduto2 = <PageProduto2>{};
  nome;
  page;
  orderBy;
  idCategoria: string;
  nomeCategoria: string;
  constructor(private produtoService: ProdutoService,
    private activatedRoute: ActivatedRoute,
    private categoriaService: CategoriaService,
    private cartService: CartDeliveryService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.findCategoria(this.activatedRoute.snapshot.params.idCategoria);
    this.idCategoria = this.activatedRoute.snapshot.params.idCategoria;
    this.findAll(this.activatedRoute.snapshot.params.idCategoria);
  }

  addToCart(produto: Produto){
    this.cartService.addProduto(produto);
    this.toastr.info('Produto Adicionado', 'Info');
  }

  totalPages() {
    const pages = [];
    for( let i = 0; i < this.pageProdutos.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  findAll(idCategoria: string, nome: string = '', page: number = 0, orderBy = 'nome', linesporPage: number = 5) {
    this.loader = true;
    this.produtoService.findByCategoria(idCategoria, nome, page, orderBy, linesporPage)
    .subscribe(
      (response: PageProduto2) => {
        this.produtos = response.content; this.pageProdutos = response;
        this.loader = false;
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
