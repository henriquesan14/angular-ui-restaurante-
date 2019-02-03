import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthService } from './services/auth.service';
import { HomeComponent } from './pages/home/home.component';
import { StorageService } from './services/storage.service';
import { UsuarioService } from './services/domain/usuario.service';
import { AuthInterceptorProvider } from './interceptors/auth-interceptor';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BarraNavegacaoComponent } from './pages/barra-navegacao/barra-navegacao.component';
import { MenuLateralComponent } from './pages/barra-navegacao/menu-lateral/menu-lateral.component';
import { PainelSimplesComponent } from './shared/painel-simples/painel-simples.component';
import { ListagemProdutosComponent } from './pages/produtos/listagem-produtos/listagem-produtos.component';
import { FormProdutoComponent } from './shared/form-produto/form-produto.component';
import { CadastroProdutoComponent } from './pages/produtos/cadastro-produto/cadastro-produto.component';
import { ListagemCategoriasComponent } from './pages/categorias/listagem-categorias/listagem-categorias.component';
import { FormCategoriaComponent } from './shared/form-categoria/form-categoria.component';
import { CadastroCategoriaComponent } from './pages/categorias/cadastro-categoria/cadastro-categoria.component';
import { ListagemMesaComponent } from './pages/mesas/listagem-mesa/listagem-mesa.component';
import { FormMesaComponent } from './shared/form-mesa/form-mesa.component';
import { CadastroMesaComponent } from './pages/mesas/cadastro-mesa/cadastro-mesa.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { FormEnderecoComponent } from './shared/form-endereco/form-endereco.component';
import { CadastroEnderecoComponent } from './pages/profile/cadastro-endereco/cadastro-endereco.component';
import { EdicaoEnderecoComponent } from './pages/profile/edicao-endereco/edicao-endereco.component';
import { ListagemUsuariosComponent } from './pages/usuarios/listagem-usuarios/listagem-usuarios.component';
import { CadastroUsuarioComponent } from './pages/usuarios/cadastro-usuario/cadastro-usuario.component';
import { RegisterComponent } from './pages/register/register.component';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    DashboardComponent,
    BarraNavegacaoComponent,
    MenuLateralComponent,
    PainelSimplesComponent,
    ListagemProdutosComponent,
    FormProdutoComponent,
    CadastroProdutoComponent,
    ListagemCategoriasComponent,
    FormCategoriaComponent,
    CadastroCategoriaComponent,
    ListagemMesaComponent,
    FormMesaComponent,
    CadastroMesaComponent,
    ProfileComponent,
    FormEnderecoComponent,
    CadastroEnderecoComponent,
    EdicaoEnderecoComponent,
    ListagemUsuariosComponent,
    CadastroUsuarioComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TextMaskModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(environment.toastConfig)
  ],
  providers: [AuthInterceptorProvider, AuthService, StorageService, UsuarioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
