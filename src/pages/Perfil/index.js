import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';

import { db } from './../../config/database';
import { getToken } from './../../services/auth';

export default class Perfil extends Component {

    state = {
        name: '',
        lastName: '',
        username: '',
        cpf: '',
        estado: '',
        cidade: '',
        cep: '',
        bairro: '',
        rua: '',
        numero: '',
        complemento: '',

        loading: true,
        saving:false,

        showSuccess : false,
        success : {
            description : '',
            animation : ''
        },
        showError : false,
        error : {
            description : '',
            animation : ''
        },

        editProfile : false,
        userInfo: {}
    }

    async componentDidMount() {
        try {
            const user = await db.collection('users').doc(getToken().uid).get();
            const userInfo = {
                id : user.id,
                info : user.data()
            }
            this.setState({ 
                userInfo, 
                loading: false,
                name: user.data().name,
                lastName: user.data().lastName,
                username: user.data().username,
                cpf: user.data().cpf,
                estado: user.data().estado,
                cidade: user.data().cidade,
                cep: user.data().cep,
                bairro: user.data().bairro,
                rua: user.data().rua,
                numero: user.data().numero,
                complemento: user.data().complemento,
            });
        } catch (error) {
            //window.location.assign('/app');
        }
    }

    changeScreen() {
        this.setState({editProfile : !this.state.editProfile}) ;
    }

    save = async (event) => {
        event.preventDefault(event);

        if( this.state.name === '' || this.state.lastName === '' || this.state.username === '' || this.state.cpf === '' || this.state.estado === '' || this.state.cidade === '' || this.state.cep === '' || this.state.bairro === '' || this.state.rua === '' || this.state.numero === '' || this.state.complemento === '' ) {
            console.log("Campos Inválidos");
            return;
        }

        this.setState({ saving : true});
        const { name, lastName, username, cpf, estado, cidade, cep, bairro, rua, numero, complemento } = this.state;
        
        try {
            await db.collection('users').doc(this.state.userInfo.id).update({name, lastName, username, cpf, estado, cidade, cep, bairro, rua, numero, complemento});
            
            this.setState({showSuccess : true, success : { description : 'Usuário Atualizado com Sucesso', animation : 'animated bounceIn'}});
            this.setState({loadingSubmit : false});
            setTimeout(() => {this.setState({showSuccess : false});}, 3000);
            setTimeout(() => {window.location.reload();}, 3500);
            return;
        } catch (error) {
            this.setState({showError : true, error : { description : 'Erro na Atualização, tente novamente mais tarde...', animation : 'animated bounceIn'}});
            this.setState({loadingSubmit : false});
            setTimeout(() => {this.setState({showError : false});}, 3000);
            this.setState({ saving : true});
            return;
        }
    }
    
    render(){
        if (this.state.loading)
            return (
                <div style={{
                    marginTop: '20%',
                    height: '100%',
                    minHeight: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}><div className="spinner-border text-primary" role="status"><span className="sr-only">Loading...</span></div></div>
            );

        const { info, id } = this.state.userInfo;
        
        if(!this.state.editProfile){
            return(
                <div>
                <h1>Perfil do Usuário - {id}</h1>
                <p>Bairro - {info.bairro}</p>
                <p>Cep - {info.cep}</p>
                <p>Cidade - {info.cidade}</p>
                <p>Complemento - {info.complemento}</p>
                <p>Cpf - {info.cpf}</p>
                <p>Estado - {info.estado}</p>
                <p>isAdmin - {info.isAdmin ? "True" : "False"}</p>
                <p>lastName - {info.lastName}</p>
                <p>Name - {info.name}</p>
                <p>Número - {info.numero}</p>
                <p>Rua - {info.rua}</p>
                <p>Username - {info.username}</p>

                <button onClick={this.changeScreen.bind(this)} className="btn btn-success">Editar</button>
            </div>
            );
        } else {
            return(
                <div>
                    {this.state.showSuccess && <Alert variant={'success'} className={this.state.success.animation}> {this.state.success.description} </Alert>}
                    {this.state.showError && <Alert variant={'danger'} className={this.state.error.animation}> {this.state.error.description} </Alert>}
                    <h1>Editando o Perfil</h1>
                    <form className="row" onSubmit={this.save}>
                        <div className="card offset-md-2 col-md-7 mt-4 mb-2">
                            <div className="card-body">
                                <div className="form-group">
                                        <label htmlFor="name">name: </label>
                                        <input className="form-control" id="name" name="name" type="text" onChange={(event) => this.setState({ name: event.target.value })} value={this.state.name} /><br />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="lastname">lastName: </label>
                                        <input className="form-control" id="lastname" name="lastname" type="text" onChange={(event) => this.setState({ lastName: event.target.value })} value={this.state.lastName}/><br />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="username">username: </label>
                                        <input className="form-control" id="username" name="username" type="text" onChange={(event) => this.setState({ username: event.target.value })} value={this.state.username}/><br />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="cpf">cpf: </label>
                                        <input className="form-control" id="cpf" name="cpf" type="text" onChange={(event) => this.setState({ cpf: event.target.value })} value={this.state.cpf}/><br />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="state">State: </label>
                                        <input className="form-control" id="state" name="state" type="text" onChange={(event) => this.setState({ estado: event.target.value })} value={this.state.estado}/><br />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="city">City: </label>
                                        <input className="form-control" id="city" name="city" type="text" onChange={(event) => this.setState({ cidade: event.target.value })} value={this.state.cidade}/><br />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="cep">Cep: </label>
                                        <input className="form-control" id="cep" name="cep" type="text" onChange={(event) => this.setState({ cep: event.target.value })} value={this.state.cep}/><br />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="neighborhood">Neighborhood: </label>
                                        <input className="form-control" id="neighborhood" name="neighborhood" type="text" onChange={(event) => this.setState({ bairro: event.target.value })} value={this.state.bairro}/><br />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="street">Street: </label>
                                        <input className="form-control" id="street" name="street" type="text" onChange={(event) => this.setState({ rua: event.target.value })} value={this.state.rua}/><br />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="number">House Number: </label>
                                        <input className="form-control" id="number" name="number" type="text" onChange={(event) => this.setState({ numero: event.target.value })} value={this.state.numero}/><br />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="complement">Complement: </label>
                                        <input className="form-control" id="complement" name="complement" type="text" onChange={(event) => this.setState({ complemento: event.target.value })} value={this.state.complemento}/><br />
                                    </div>
                                    {!this.state.saving &&
                                        <div className="row">
                                            <button onClick={this.changeScreen.bind(this)} className="btn btn-primary col-md-2">Voltar</button> 
                                            <button type="submit" className="btn btn-success col-md-2 offset-md-8" >Salvar</button>
                                        </div>
                                    }
                                    {this.state.saving &&
                                        <div className="row">
                                            <div className="col-md-1"></div>
                                            <div className="spinner-border text-primary offset-md-5" role="status"><span className="sr-only">Loading...</span></div>
                                        </div>
                                    }
                                </div>
                            </div>
                        </form>
                </div>
            );
        }
    }
}