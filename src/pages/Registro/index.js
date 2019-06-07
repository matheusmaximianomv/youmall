import React, { Component } from 'react';

import firebase from '../../config/database';
import {login} from './../../services/auth';

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
        erro: {
            description: '',
            animation: ''
        },
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

        if (!name || !lastName || !username || !email || !password || !cpf  || !estado || !cidade || !cep || !bairro || !rua || !numero || !complemento) {
            this.setState({ erro: { description: 'Campos Inválidos', animation: 'animated bounceIn' } });
            // Tempo para visualizar
            setTimeout(() => {
                this.setState({ erro: { description: 'Campos Inválidos', animation: 'animated bounceOutRight' } });
            }, 5000);
            // Tempo para retornar 
            setTimeout(() => {
                this.setState({ erro: { description: '', animation: '' } });
            }, 5500);
            this.setState({ register: false });
            return;
        }

        auth.createUserWithEmailAndPassword(email, password)
            .then(response => {
                db.collection('users').doc(response.user.uid).set({ name, lastName, username, cpf, estado, cidade, cep, bairro, rua, numero, complemento })
                    .then(result => {
                        this.setState({ success: { description: 'Usuário Registrado com Sucesso.', animation: 'animated bounceIn' } });
                        // Tempo para visualizar    
                        setTimeout(() => {
                            this.setState({ success: { description: 'Usuário Registrado com Sucesso. Aguarde...', animation: 'animated bounceOutRight' } });
                        }, 5000);
                        // Tempo para retornar 
                        setTimeout(() => {
                            this.setState({ success: { description: '', animation: '' } });
                            auth.signInWithEmailAndPassword(email, password)
                                .then(async result => {
                                    await login(result);
                                    this.props.history.push("/app");
                                })
                        }, 5500);
                    })
                    .catch(error => {
                        console.log(error);
                        this.setState({ erro: { description: 'Falha no Cadastro', animation: 'animated bounceIn' } });
                        // Tempo para visualizar
                        setTimeout(() => {
                            this.setState({ erro: { description: 'Falha no Cadastro', animation: 'animated bounceOutRight' } });
                        }, 5000);
                        // Tempo para retornar 
                        setTimeout(() => {
                            this.setState({ erro: { description: '', animation: '' } });
                        }, 5500);
                        this.setState({ register: false });
                        return;
                    })
            }).catch(error => {
                console.log(error);
                this.setState({ erro: { description: 'Falha no Cadastro', animation: 'animated bounceIn' } });
                // Tempo para visualizar
                setTimeout(() => {
                    this.setState({ erro: { description: 'Falha no Cadastro', animation: 'animated bounceOutRight' } });
                }, 5000);
                // Tempo para retornar 
                setTimeout(() => {
                    this.setState({ erro: { description: '', animation: '' } });
                }, 5500);
                this.setState({ register: false });
                return;
            });
    }

    render() {
        return (
            <div className="container">
                {this.state.erro.description && <div id="erro" className={`alert alert-danger mt-2 mb-2 ${this.state.erro.animation}`} role="alert"> {this.state.erro.description}</div>}
                {this.state.success.description && <div id="erro" className={`alert alert-success mt-2 mb-2 ${this.state.success.animation}`} role="alert"> {this.state.success.description}</div>}
                <div className="card mt-4 mb-2">
                    <div className="card-body">
                        <form onSubmit={this.cadastrarUsuario}>
                            <div className="form-group">
                                <label htmlFor="name">name: </label>
                                <input className="form-control" id="name" name="name" type="text" onChange={(event) => this.setState({ name: event.target.value })} /><br />
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastname">lastName: </label>
                                <input className="form-control" id="lastname" name="lastname" type="text" onChange={(event) => this.setState({ lastName: event.target.value })} /><br />
                            </div>
                            <div className="form-group">
                                <label htmlFor="username">username: </label>
                                <input className="form-control" id="username" name="username" type="text" onChange={(event) => this.setState({ username: event.target.value })} /><br />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">email: </label>
                                <input className="form-control" id="email" name="email" type="email" onChange={(event) => this.setState({ email: event.target.value })} /><br />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">password: </label>
                                <input className="form-control" id="password" name="password" type="password" onChange={(event) => this.setState({ password: event.target.value })} /><br />
                            </div>
                            <div className="form-group">
                                <label htmlFor="cpf">cpf: </label>
                                <input className="form-control" id="cpf" name="cpf" type="text" onChange={(event) => this.setState({ cpf: event.target.value })} /><br />
                            </div>
                            <div className="form-group">
                                <label htmlFor="state">State: </label>
                                <input className="form-control" id="state" name="state" type="text" onChange={(event) => this.setState({ estado: event.target.value })} /><br />
                            </div>
                            <div className="form-group">
                                <label htmlFor="city">City: </label>
                                <input className="form-control" id="city" name="city" type="text" onChange={(event) => this.setState({ cidade: event.target.value })} /><br />
                            </div>
                            <div className="form-group">
                                <label htmlFor="cep">Cep: </label>
                                <input className="form-control" id="cep" name="cep" type="text" onChange={(event) => this.setState({ cep: event.target.value })} /><br />
                            </div>
                            <div className="form-group">
                                <label htmlFor="neighborhood">Neighborhood: </label>
                                <input className="form-control" id="neighborhood" name="neighborhood" type="text" onChange={(event) => this.setState({ bairro: event.target.value })} /><br />
                            </div>
                            <div className="form-group">
                                <label htmlFor="street">Street: </label>
                                <input className="form-control" id="street" name="street" type="text" onChange={(event) => this.setState({ rua: event.target.value })} /><br />
                            </div>
                            <div className="form-group">
                                <label htmlFor="number">House Number: </label>
                                <input className="form-control" id="number" name="number" type="text" onChange={(event) => this.setState({ numero: event.target.value })} /><br />
                            </div>
                            <div className="form-group">
                                <label htmlFor="complement">Complement: </label>
                                <input className="form-control" id="complement" name="complement" type="text" onChange={(event) => this.setState({ complemento: event.target.value })} /><br />
                            </div>
                            {!this.state.register && <button className="btn btn-success" type="submit">Enviar</button>}
                            {this.state.register && <div className="spinner-border text-primary" role="status"><span className="sr-only">Loading...</span></div>}
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}