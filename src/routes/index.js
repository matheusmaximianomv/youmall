import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import AdministratorRoute from './AdministratorRoute';
import AuthenticationRoute from './AuthenticationRoute';

import Registro from './../pages/Registro';
import Login from './../pages/Login';
import NovoProduto from '../pages/NovoProduto';
import MeusProdutos from './../pages/MeusProdutos';

import Banner from '../components/Banner';

export default class Routes extends Component {

  render() {
    return (
      <BrowserRouter>
        <Switch>
          {/* Rotas Comuns */}
          <Route exact path="/" component={() => <Banner title="Vai da certo"/>} />
          <AuthenticationRoute path="/login" component={Login} />
          <AuthenticationRoute path="/registro" component={Registro} />
          {/* Rotas Com Autenticação */}
          <PrivateRoute exact path="/app" component={() => <h1>Home</h1>} />
          <PrivateRoute exact path="/app/perfil" component={() => <h1>Perfil do Usuário</h1>} />
          <PrivateRoute exact path="/app/produtos" component={() => <h1>Mostrando Produtos da Plataforma</h1>} />
          <PrivateRoute exact path="/app/produtos/:slug_product" component={() => <h1>Mostrando descrição de um produto da plataforma</h1>} />
          <PrivateRoute exact path="/app/meus-produtos" component={MeusProdutos} />
          <PrivateRoute exact path="/app/meus-produtos/novo" component={NovoProduto} />
          <PrivateRoute exact path="/app/meus-produtos/editar/:id" component={NovoProduto} />
          <PrivateRoute path="/app/carrinho" component={() => <h1>Seu Carrinho de Compras</h1>} />
          <PrivateRoute path="/app/carrinho/pagamento" component={() => <h2>processo de pagamento</h2>} />
          {/* Rotas De Administrador */}
          <AdministratorRoute exact path="/app/admin"  component={() => <h1>Home do Administrador</h1>} />
          <AdministratorRoute exact path="/app/admin/denuncias" component={() => <h1>Página de Denuncias</h1>} />
          <AdministratorRoute path="/app/admin/denuncias/:id" component={() => <h1>Página de Denuncias Única</h1>} />
          {/* Rotas Inexistente */}
          <Route path="*" component={() => <h1>Página Não Encontrada</h1>} />
        </Switch>
      </BrowserRouter>
    );
  }
}
