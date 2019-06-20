import React, { Component } from 'react';

import firebase from '../../config/database';
import { login } from './../../services/auth';

import Banner from './../../components/Banner';
import NavBar from './../../components/NavBar';
import Footer from './../../components/Footer';

export default class Registro extends Component {
    state = {
        name: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        cpf: '',
        estado: '',
        cidade: '',
        cep: '',
        bairro: '',
        rua: '',
        numero: '',
        complemento: '',
        showErro : false,
        erro: {
            description: '',
            animation: ''
        },
        showSuccess : false,
        success: {
            description: '',
            animation: ''
        },
        register: false
    };

    cadastrarUsuario = (event) => {

        event.preventDefault(event);
        this.setState({ register: true });

        const auth = firebase.auth();
        const db = firebase.firestore();

        const { name, lastName, username, email, password, cpf, estado, cidade, cep, bairro, rua, numero, complemento } = this.state;
        this.setState({ name: '', lastName: '', username: '', email: '', password: '', cpf: '', estado: '', cidade: '', cep: '', bairro: '', rua: '', numero: '', complemento: '' });

        if (!name || !lastName || !username || !email || !password || !cpf || !estado || !cidade || !cep || !bairro || !rua || !numero || !complemento) {
            this.setState({ showErro: true, erro: { description: 'Campos Inválidos', animation: 'animated bounceIn' } });
            // Tempo para visualizar
            setTimeout(() => {
                this.setState({ erro: { description: 'Campos Inválidos', animation: 'animated bounceOutRight' } });
            }, 3000);
            // Tempo para retornar 
            setTimeout(() => {
                this.setState({ showErro: false, erro: { description: '', animation: '' } });
            }, 3500);
            this.setState({ register: false });
            return;
        }

        auth.createUserWithEmailAndPassword(email, password)
            .then(response => {
                db.collection('users').doc(response.user.uid).set({ name, lastName, username, cpf, estado, cidade, cep, bairro, rua, numero, complemento })
                    .then(result => {
                        this.setState({ showSuccess : true ,success: { description: 'Usuário Registrado com Sucesso.', animation: 'animated bounceIn' } });
                        // Tempo para visualizar    
                        setTimeout(() => {
                            this.setState({ success: { description: 'Usuário Registrado com Sucesso. Aguarde...', animation: 'animated bounceOutRight' } });
                        }, 3000);
                        // Tempo para retornar 
                        setTimeout(() => {
                            this.setState({ showSuccess : false, success: { description: '', animation: '' } });
                            auth.signInWithEmailAndPassword(email, password)
                                .then(async result => {
                                    await login(result);
                                    this.props.history.push("/");
                                    return;
                                })
                        }, 3500);
                    })
                    .catch(error => {
                        console.log(error);
                        this.setState({ showErro: true, erro: { description: 'Falha no Cadastro. Tente Novamente', animation: 'animated bounceIn' } });
                        // Tempo para visualizar
                        setTimeout(() => {
                            this.setState({ erro: { description: 'Falha no Cadastro. Tente Novamente', animation: 'animated bounceOutRight' } });
                        }, 3000);
                        // Tempo para retornar 
                        setTimeout(() => {
                            this.setState({ showErro: false, erro: { description: '', animation: '' } });
                        }, 3500);
                        this.setState({ register: false });
                        return;
                    })
            }).catch(error => {
                console.log(error);
                this.setState({ showErro: true, erro: { description: 'Falha no Cadastro. Tente Novamente', animation: 'animated bounceIn' } });
                // Tempo para visualizar
                setTimeout(() => {
                    this.setState({ erro: { description: 'Falha no Cadastro. Tente Novamente', animation: 'animated bounceOutRight' } });
                }, 3000);
                // Tempo para retornar 
                setTimeout(() => {
                    this.setState({ showErro: false, erro: { description: '', animation: '' } });
                }, 3500);
                this.setState({ register: false });
                return;
            });
    }

    render() {
        return (
            <div>
                <NavBar />
                <Banner title="Registro" />
                {this.state.erro.description && <div id="erro" className={`alert alert-danger mt-2 mb-2 ${this.state.erro.animation}`} role="alert"> {this.state.erro.description}</div>}
                {this.state.success.description && <div id="erro" className={`alert alert-success mt-2 mb-2 ${this.state.success.animation}`} role="alert"> {this.state.success.description}</div>}
                <section className="login_box_area section_gap">
                    <div className="container">
                        <div className="col-lg-6" style={{marginTop:'0', marginBottom:'0', marginLeft:'auto', marginRight:'auto'}}>
                            <div className="login_form_inner">
                                <h3>Criar Conta</h3>
                                <form className="row login_form" onSubmit={this.cadastrarUsuario}>
                                    <div className="col-md-12 form-group">
                                        <input className="form-control" id="name" name="name" type="text" onChange={(event) => this.setState({ name: event.target.value })} placeholder="Nome" value={this.state.name}/>
                                    </div>
                                    <div className="col-md-12 form-group">
                                        <input className="form-control" id="lastname" name="lastname" type="text" onChange={(event) => this.setState({ lastName: event.target.value })} placeholder="Sobrenome" value={this.state.lastName}/>
                                    </div>
                                    <div className="col-md-12 form-group">
                                        <input className="form-control" id="username" name="username" type="text" onChange={(event) => this.setState({ username: event.target.value })} placeholder="Nome de Usuário" value={this.state.username}/>
                                    </div>
                                    <div className="col-md-12 form-group">
                                        <input className="form-control" id="email" name="email" type="email" onChange={(event) => this.setState({ email: event.target.value })} placeholder="Email" value={this.state.email}/>
                                    </div>
                                    <div className="col-md-12 form-group">
                                        <input className="form-control" id="password" name="password" type="password" onChange={(event) => this.setState({ password: event.target.value })} placeholder="Senha" value={this.state.password}/>
                                    </div>
                                    <div className="col-md-12 form-group">
                                        <input className="form-control" id="cpf" name="cpf" type="text" onChange={(event) => this.setState({ cpf: event.target.value })} placeholder="CPF" value={this.state.cpf}/>
                                    </div>
                                    <div className="col-md-12 form-group">
                                        <input className="form-control" id="cep" name="cep" type="text" onChange={(event) => this.setState({ cep: event.target.value })} placeholder="CEP" value={this.state.cep}/>
                                    </div>
                                    <div className="col-md-12 form-group">
                                        <input className="form-control" id="state" name="state" type="text" onChange={(event) => this.setState({ estado: event.target.value })} placeholder="Estado" value={this.state.estado} />
                                    </div>
                                    <div className="col-md-12 form-group">
                                        <input className="form-control" id="neighborhood" name="neighborhood" type="text" onChange={(event) => this.setState({ bairro: event.target.value })} placeholder="Bairro" value={this.state.bairro}/>
                                    </div>
                                    <div className="col-md-12 form-group">
                                        <input className="form-control" id="city" name="city" type="text" onChange={(event) => this.setState({ cidade: event.target.value })} placeholder="Cidade" value={this.state.cidade}/>
                                    </div>
                                    <div className="col-md-12 form-group">
                                        <input className="form-control" id="street" name="street" type="text" onChange={(event) => this.setState({ rua: event.target.value })} placeholder="Rua" value={this.state.rua}/>
                                    </div>
                                    <div className="col-md-12 form-group">
                                        <input className="form-control" id="number" name="number" type="text" onChange={(event) => this.setState({ numero: event.target.value })} placeholder="Número da Casa" value={this.state.numero}/>
                                    </div>
                                    <div className="col-md-12 form-group">
                                        <input className="form-control" id="complement" name="complement" type="text" onChange={(event) => this.setState({ complemento: event.target.value })} placeholder="Complemento" value={this.state.complemento}/>
                                    </div>
                                    <div className="col-md-12 form-group">
                                        {this.state.showSuccess && <div id="erro" className={`alert alert-success mt-2 mb-2 ${this.state.success.animation}`} role="alert">{this.state.success.description}</div>}
                                        {this.state.showErro && <div id="erro" className={`alert alert-danger mt-2 mb-2 ${this.state.erro.animation}`} role="alert">{this.state.erro.description}</div>}
                                        {!this.state.register && <button type="submit" value="submit" className="primary-btn">Criar Conta</button>}
                                        {this.state.register && <div className="spinner-border text-primary" role="status"><span className="sr-only">Loading...</span></div>}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
                <Footer />
            </div >
        );
    }
}