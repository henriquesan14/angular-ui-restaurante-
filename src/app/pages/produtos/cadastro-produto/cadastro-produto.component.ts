import { Component, Output, EventEmitter} from '@angular/core';
import { Produto } from 'src/app/models/produto';
import { ProdutoService } from 'src/app/services/domain/produto.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cadastro-produto',
  templateUrl: './cadastro-produto.component.html',
  styleUrls: ['./cadastro-produto.component.css']
})
export class CadastroProdutoComponent {

  @Output() outputEvent = new EventEmitter();
  constructor(private produtoService: ProdutoService,
     private router: Router,
     private toastr: ToastrService) { }

  addProduto(produto: Produto) {
    this.produtoService.insert(produto)
    .subscribe(() => {
        this.toastr.success('Produto cadastrado', 'Sucesso');
         this.router.navigateByUrl('/dashboard/produtos'); }, (error) =>{
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
