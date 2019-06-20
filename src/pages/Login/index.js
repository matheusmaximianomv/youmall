import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import firebase from './../../config/database';
import { login } from './../../services/auth';

import Banner from './../../components/Banner';
import NavBar from './../../components/NavBar';
import Footer from './../../components/Footer';

export default class Login extends Component {
    state = {
        email: '',
        password: '',
        showSuccess : false,
        success : {
            description : '',
            animation : ''
        },
        erro: {
            description: '',
            animation: ''
        },
        enter: false
    }

    login = (event) => {

        event.preventDefault(event);
        this.setState({ enter: true });
        const auth = firebase.auth();
        const { email, password } = this.state;
        console.log(email, password);

        auth.signInWithEmailAndPassword(email, password)
            .then(async result => {
                await login(result);
                this.setState({showSuccess : true, success : { description : 'Login Efetuado com Sucesso', animation : 'animated bounceIn'}});
                setTimeout(() => {this.setState({showSuccess : false});}, 3000);
                setTimeout(() => {this.props.history.push("/");}, 3500);
                return;
            })
            .catch(error => {
                console.log(error);
                this.setState({ erro: { description: 'Seu email ou senha não está cadastrado', animation: 'animated bounceIn' } });
                // Tempo para visualizar
                setTimeout(() => {
                    this.setState({ erro: { description: 'Seu email ou senha não está cadastrado', animation: 'animated bounceOutRight' } });
                }, 5000);
                // Tempo para retornar 
                setTimeout(() => {
                    this.setState({ erro: { description: '', animation: '' } });
                }, 5500);
                this.setState({ enter: false });
                return;
            });
    }

    render() {
        return (

            <div>
                <NavBar />
                <Banner title="Login" />
                <section className="login_box_area section_gap">
                    <div className="container">
                        {this.state.erro.description && <div id="erro" className={`alert alert-danger mt-2 mb-2 ${this.state.erro.animation}`} role="alert"> {this.state.erro.description}</div>}
                        {this.state.showSuccess && <div id="erro" className={`alert alert-success mt-2 mb-2 ${this.state.success.animation}`} role="alert"> {this.state.success.description}</div>}
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="login_box_img">
                                    <img className="img-fluid" src="img/login.jpg" alt="" />
                                    <div className="hover">
                                        <h4>Novo no nosso site?</h4>
                                        <p>Clique no botão abaixo para criar sua conta gratuita no YouMall</p>
                                        <Link className="primary-btn" to="/registro">Criar conta</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="login_form_inner">
                                    <h3>Login</h3>
                                    <form className="row login_form" onSubmit={this.login} id="contactForm">
                                        <div className="col-md-12 form-group">
                                            <input className="form-control" id="email" name="email" type="email" onChange={(event) => this.setState({ email: event.target.value })} placeholder="Email" />
                                        </div>
                                        <div className="col-md-12 form-group">
                                            <input className="form-control" id="password" name="password" type="password" onChange={(event) => this.setState({ password: event.target.value })} placeholder="Senha" />
                                        </div>
                                        <div className="col-md-12 form-group">
                                            {!this.state.enter && <button type="submit" value="submit" className="primary-btn">Entrar</button>}
                                            {this.state.enter && <div className="spinner-border text-primary" role="status"><span className="sr-only">Loading...</span></div>}
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <Footer />
                {/*<div className="card mt-4 mb-2">
                    <div className="card-body">
                        <form onSubmit={this.login}>
                            <div className="form-group">
                                <label htmlFor="email">email: </label>
                                <input className="form-control" id="email" name="email" type="email" onChange={(event) => this.setState({ email: event.target.value })} /><br />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">password: </label>
                                <input className="form-control" id="password" name="password" type="password" onChange={(event) => this.setState({ password: event.target.value })} /><br />
                            </div>
                            {!this.state.enter && <button className="btn btn-success" type="submit">Logar</button>}
                            {this.state.enter && <div className="spinner-border text-primary" role="status"><span className="sr-only">Loading...</span></div>}
                        </form>
                    </div>
                </div>*/}
            </div>
        );
    }
}