import { Component, OnInit } from '@angular/core';
import { PedidoService } from 'src/app/services/domain/pedido.service';
import { Pedido } from 'src/app/models/pedido';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from 'src/app/services/storage.service';
import { UsuarioService } from 'src/app/services/domain/usuario.service';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-pedido-detail',
  templateUrl: './pedido-detail.component.html',
  styleUrls: ['./pedido-detail.component.css']
})
export class PedidoDetailComponent implements OnInit {

  public numberMask = createNumberMask({
    prefix: '',
    suffix: '',
    includeThousandsSeparator: false,
    thousandsSeparatorSymbol: '.',
    allowDecimal: true,
    decimalSymbol: '.',
    decimalLimit: 2,
    integerLimit: 4,
    requireDecimal: false,
    allowNegative: false,
    allowLeadingZeroes: false
  });
  formPag: FormGroup;
  funcionario = false;
  usuario: Usuario = <Usuario>{perfis: []};
  pedido: Pedido = <Pedido>{mesa: {}, cliente: {}, itens: [
    {produto: {}}
  ], pagamentos: []};
  id: string;
  constructor(private pedidoService: PedidoService,
     private activatedRoute: ActivatedRoute,
     private formBuilder: FormBuilder,
     private toastr: ToastrService,
     private usuarioService: UsuarioService,
     private storage: StorageService) {
      }

  ngOnInit() {
    this.find(this.activatedRoute.snapshot.params.id);
    this.configuraForm();
    this.getUsuario();
  }

  configuraForm(){
    this.formPag = this.formBuilder.group({
      valorRecebido: [null, Validators.required],
      formaPagamento: [null, Validators.required]
    });
  }

  addPagamento(){
    this.pedidoService.addPagamento(this.activatedRoute.snapshot.params.id, this.formPag.value)
    .subscribe(() => {
      console.log('sucess');
      this.toastr.success('Pagamento adicionado!', 'Sucesso');
      this.formPag.reset();
      this.find(this.activatedRoute.snapshot.params.id);
    }, (error) =>{
      console.log(error);
      if (error.error.errors){
        for (const err of error.error.errors){
          this.toastr.error(err.message, 'Falha');
        }
       } else {
        this.toastr.error(error.error.message, 'Falha');
       }
    });
  }


  find(id: string){
    this.pedidoService.find(id)
    .subscribe((response) => {
      this.pedido = response;
    },
    (error) => {console.log(error);});
  }

  getUsuario(){
    let usuario = this.storage.getLocalUser();
    this.usuarioService.findByEmail(usuario.email)
    .subscribe(
      (response) => {this.usuario = response;
      this.funcionario = this.isFuncionario(response.perfis);}
    );
  }

  isFuncionario(roles: string[]): boolean{
    let ok = false;
    for(const r of roles){
      if(r=='GARCOM' || r=='COZINHEIRO' || r=='ADMIN'){
        ok = true;
        break;
      }
    }
    return ok;
  }



}
