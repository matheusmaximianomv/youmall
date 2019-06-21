/* Funcionalidades */
import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

/* Tipos de Rota */
import PrivateRoute from './PrivateRoute';
import AdministratorRoute from './AdministratorRoute';
import AuthenticationRoute from './AuthenticationRoute';

/* Páginas de Registro e Autenticação */
import Registro from './../pages/Registro';
import Login from './../pages/Login';
/* Pagina Home */
import Home from './../pages/Home';
/* Páginas de Produtos Gerais da Plataforma */
import Produtos from './../pages/Produtos/index.1';
import ProdutoSlug from './../pages/Produtos/ProdutoSlug/index';
/* Páginas de Controle de Produtos Pessoais  */
import MeusProdutos from './../pages/MeusProdutos';
import NovoProduto from '../pages/NovoProduto';
import EditarProduto from '../pages/EditarProduto';
/* Página de Perfil de Usuário */
import Perfil from '../pages/Perfil';
/* Página do Carrinho de Compras */
import Carrinho from './../pages/Carrinho';
/* Página do Pagamento */
import Pagamento from './../pages/Pagamento';
/* Página do Administrador de Denúncias */
import Denuncias from './../pages/Denuncias';
import DenunciaSlug from './../pages/Denuncias/DenunciaSlug';

export default class Routes extends Component {

  render() {
    return (
      <BrowserRouter>
        <Switch>
          {/* Rotas Comuns */}
          <Route exact path="/" component={Home}/>
          <AuthenticationRoute path="/login" component={Login} />
          <AuthenticationRoute path="/registro" component={Registro} />
          {/* Rotas Com Autenticação */}
          <PrivateRoute exact path="/app/perfil" component={Perfil} />
          <PrivateRoute exact path="/app/produtos" component={Produtos} />
          <PrivateRoute exact path="/app/produtos/:slug_product" component={ProdutoSlug} />
          <PrivateRoute exact path="/app/meus-produtos" component={MeusProdutos} />
          <PrivateRoute exact path="/app/meus-produtos/novo" component={NovoProduto} />
          <PrivateRoute exact path="/app/meus-produtos/editar/:id" component={EditarProduto} />
          <PrivateRoute exact path="/app/carrinho" component={Carrinho} />
          <PrivateRoute exact path="/app/carrinho/pagamento" component={Pagamento} />
          {/* Rotas De Administrador */}
          {/* Dashboard - <AdministratorRoute exact path="/app/admin"  component={() => <h1>Home do Administrador</h1>} /> */}
          <AdministratorRoute exact path="/app/admin/denuncias" component={Denuncias} />
          <AdministratorRoute exact path="/app/admin/denuncias/:id" component={DenunciaSlug} />
          {/* Rotas Inexistente */}
          <Route path="*" component={() => <h1>Página Não Encontrada</h1>} />
        </Switch>
      </BrowserRouter>
    );
  }
}
