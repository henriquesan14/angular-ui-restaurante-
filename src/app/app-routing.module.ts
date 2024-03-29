import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ListagemProdutosComponent } from './pages/produtos/listagem-produtos/listagem-produtos.component';
import { CadastroProdutoComponent } from './pages/produtos/cadastro-produto/cadastro-produto.component';
import { ListagemCategoriasComponent } from './pages/categorias/listagem-categorias/listagem-categorias.component';
import { CadastroCategoriaComponent } from './pages/categorias/cadastro-categoria/cadastro-categoria.component';
import { ListagemMesaComponent } from './pages/mesas/listagem-mesa/listagem-mesa.component';
import { CadastroMesaComponent } from './pages/mesas/cadastro-mesa/cadastro-mesa.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { EdicaoEnderecoComponent } from './pages/profile/edicao-endereco/edicao-endereco.component';
import { ListagemUsuariosComponent } from './pages/usuarios/listagem-usuarios/listagem-usuarios.component';
import { CadastroUsuarioComponent } from './pages/usuarios/cadastro-usuario/cadastro-usuario.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/not-auth.guard';
import { EdicaoProdutoComponent } from './pages/produtos/edicao-produto/edicao-produto.component';
import { EdicaoCategoriaComponent } from './pages/categorias/edicao-categoria/edicao-categoria.component';
import { EdicaoMesaComponent } from './pages/mesas/edicao-mesa/edicao-mesa.component';
import { UsuarioDetailComponent } from './pages/usuarios/usuario-detail/usuario-detail.component';
import { CadastroPedidoComponent } from './pages/pedidos/cadastro-pedido/cadastro-pedido.component';
import { ProdutosCategoriaComponent } from './pages/pedidos/cadastro-pedido/produtos-categoria/produtos-categoria.component';
import { TiposCategoriasComponent } from './pages/pedidos/cadastro-pedido/tipos-categorias/tipos-categorias.component';
import { ListagemPedidosComponent } from './pages/pedidos/listagem-pedidos/listagem-pedidos.component';
import { PedidoDetailComponent } from './pages/pedidos/pedido-detail/pedido-detail.component';
import { DemandaCozinhaComponent } from './pages/itens/demanda-cozinha/demanda-cozinha.component';
import { DemandaGarcomComponent } from './pages/itens/demanda-garcom/demanda-garcom.component';
import { PedidosDiariosComponent } from './pages/pedidos/pedidos-diarios/pedidos-diarios.component';
import { ItensDiariosComponent } from './pages/pedidos/itens-diarios/itens-diarios.component';
import { PedidosPendentesComponent } from './pages/pedidos/pedidos-pendentes/pedidos-pendentes.component';
import { CadastroDeliveryComponent } from './pages/pedidos/cadastro-delivery/cadastro-delivery.component';
import { DeliveryTiposCategoriasComponent } from './pages/pedidos/cadastro-delivery/delivery-tipos-categorias/delivery-tipos-categorias.component';
import { DeliveryProdutosCategoriasComponent } from './pages/pedidos/cadastro-delivery/delivery-produtos-categorias/delivery-produtos-categorias.component';

const routes: Routes = [
  {path: '', component: LoginComponent, canActivate: [NotAuthGuard]},
  {path: 'register', component: RegisterComponent,  canActivate: [NotAuthGuard]},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard],  children: [
    {path: '', component: HomeComponent},
    {path: 'produtos', component: ListagemProdutosComponent},
    {path: 'produtos/novo', component: CadastroProdutoComponent},
    {path: 'produtos/editar/:id', component: EdicaoProdutoComponent},
    {path: 'categorias', component: ListagemCategoriasComponent},
    {path: 'categorias/novo', component: CadastroCategoriaComponent},
    {path: 'categorias/editar/:id', component: EdicaoCategoriaComponent},
    {path: 'mesas', component: ListagemMesaComponent},
    {path: 'mesas/novo', component: CadastroMesaComponent},
    {path: 'mesas/editar/:id', component: EdicaoMesaComponent},
    {path: 'profile', component: ProfileComponent},
    {path: 'profile/:idUsuario/endereco/:idEndereco', component: EdicaoEnderecoComponent},
    {path: 'usuarios', component: ListagemUsuariosComponent},
    {path: 'usuarios/novo', component: CadastroUsuarioComponent},
    {path: 'usuarios/:id', component: UsuarioDetailComponent},
    {path: 'pedidos', component: ListagemPedidosComponent},
    {path: 'pedidos/pendente', component: PedidosPendentesComponent},
    {path: 'pedidos/hoje', component: PedidosDiariosComponent},
    {path: 'itens/hoje', component: ItensDiariosComponent},
    {path: 'pedidos/details/:id', component: PedidoDetailComponent},
    {path: 'pedidos/novo', component: CadastroPedidoComponent, children: [
      {path: '', component: TiposCategoriasComponent},
      {path: 'produtos/:idCategoria', component: ProdutosCategoriaComponent}
    ]},
    {path: 'deliverys/novo', component: CadastroDeliveryComponent, children: [
      {path: '', component: DeliveryTiposCategoriasComponent},
      {path: 'produtos/:idCategoria', component: DeliveryProdutosCategoriasComponent}
    ]},
    {path: 'demandas/cozinha', component: DemandaCozinhaComponent},
    {path: 'demandas/garcom', component: DemandaGarcomComponent}
  ]},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
