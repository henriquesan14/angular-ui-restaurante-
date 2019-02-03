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

const routes: Routes = [
  {path: '', component: LoginComponent, canActivate: [NotAuthGuard]},
  {path: 'register', component: RegisterComponent,  canActivate: [NotAuthGuard]},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard],  children: [
    {path: '', component: HomeComponent},
    {path: 'produtos', component: ListagemProdutosComponent},
    {path: 'produtos/novo', component: CadastroProdutoComponent},
    {path: 'categorias', component: ListagemCategoriasComponent},
    {path: 'categorias/novo', component: CadastroCategoriaComponent},
    {path: 'mesas', component: ListagemMesaComponent},
    {path: 'mesas/novo', component: CadastroMesaComponent},
    {path: 'profile', component: ProfileComponent},
    {path: 'profile/:idUsuario/endereco/:idEndereco', component: EdicaoEnderecoComponent},
    {path: 'usuarios', component: ListagemUsuariosComponent},
    {path: 'usuarios/novo', component: CadastroUsuarioComponent}
  ]},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
