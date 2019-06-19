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
/* Páginas de Produtos Gerais da Plataforma */
import Produtos from './../pages/Produtos';
import ProdutoSlug from './../pages/Produtos/ProdutoSlug/index';
/* Páginas de Controle de Produtos Pessoais  */
import MeusProdutos from './../pages/MeusProdutos';
import NovoProduto from '../pages/NovoProduto';
import EditarProduto from '../pages/EditarProduto';
/* Página de Perfil de Usuário */
import Perfil from '../pages/Perfil';

import Banner from '../components/Banner';
import NavBar from '../components/NavBar';

export default class Routes extends Component {

  render() {
    return (
      <BrowserRouter>
        <Switch>
          {/* Rotas Comuns */}
          <Route exact path="/" component={() =>  <NavBar/>} />
          <AuthenticationRoute path="/login" component={Login} />
          <AuthenticationRoute path="/registro" component={Registro} />
          {/* Rotas Com Autenticação */}
          <PrivateRoute exact path="/app" component={() => <h1>Home</h1>} />
          <PrivateRoute exact path="/app/perfil" component={Perfil} />
          <PrivateRoute exact path="/app/produtos" component={Produtos} />
          <PrivateRoute exact path="/app/produtos/:slug_product" component={ProdutoSlug} />
          <PrivateRoute exact path="/app/meus-produtos" component={MeusProdutos} />
          <PrivateRoute exact path="/app/meus-produtos/novo" component={NovoProduto} />
          <PrivateRoute exact path="/app/meus-produtos/editar/:id" component={EditarProduto} />
          <PrivateRoute path="/app/carrinho" component={() => <h1>Seu Carrinho de Compras</h1>} />
          <PrivateRoute path="/app/carrinho/pagamento" component={() => <h2>processo de pagamento</h2>} />
          {/* Rotas De Administrador */}
          {/* Dashboard - <AdministratorRoute exact path="/app/admin"  component={() => <h1>Home do Administrador</h1>} /> */}
          <AdministratorRoute exact path="/app/admin/denuncias" component={() => <h1>Página de Denuncias</h1>} />
          <AdministratorRoute path="/app/admin/denuncias/:id" component={() => <h1>Página de Denuncias Única</h1>} />
          {/* Rotas Inexistente */}
          <Route path="*" component={() => <h1>Página Não Encontrada</h1>} />
        </Switch>
      </BrowserRouter>
    );
  }
}
