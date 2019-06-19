import React, { Component } from 'react';

import firebase from './../../config/database';
import { login } from './../../services/auth'; 

export default class Login extends Component {
    state = {
        email : '',
        password : '',
        erro : {
            description : '',
            animation : ''
        },
        enter : false
    }

    login = (event) => {

        event.preventDefault(event);
        this.setState({ enter : true });

        const auth = firebase.auth();
        const { email, password } = this.state;
        console.log(email, password);
        
        auth.signInWithEmailAndPassword(email, password)
            .then(async result => {
                await login(result);
                this.props.history.push("/app");
            })
            .catch(error => {
                console.log(error);
                this.setState({ erro : { description :'Seu email ou senha não está cadastrado', animation : 'animated bounceIn'} });
                // Tempo para visualizar
                setTimeout(()=> {
                    this.setState({ erro : { description :'Seu email ou senha não está cadastrado', animation : 'animated bounceOutRight'}});
                }, 5000);
                // Tempo para retornar 
                setTimeout(() => {
                    this.setState({ erro : {description : '', animation : ''}});
                }, 5500);
                this.setState({enter : false});
                return;
            });
    }

    render() {
        return (
            
            <div className="container">
                {this.state.erro.description && <div id="erro" className={`alert alert-danger mt-2 mb-2 ${this.state.erro.animation}`} role="alert"> {this.state.erro.description}</div>}
                <div className="card mt-4 mb-2">
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
                </div>
            </div>
        );
    }
}