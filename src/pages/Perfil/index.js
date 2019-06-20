import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';

import { db } from './../../config/database';
import { getToken } from './../../services/auth';

import NavBar from './../../components/NavBar';
import Footer from '../../components/Footer';
import Banner from '../../components/Banner';

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

        const { info } = this.state.userInfo;
        
        if(!this.state.editProfile){
            return(
                <div>
                    <NavBar />
                    <Banner title="Perfil"/>
                    <div className="col-lg-8 posts-list" style={{margin: "auto"}}>
                        <div className="comment-form" >
                            <h4>{info.username}</h4>
                            <form >
                                <div className="form-group form-inline">
                                    <div className="form-group col-lg-6 col-md-6 ">
                                        <p>Bairro - {info.bairro}</p>
                                    </div>
                                    <div className="form-group col-lg-6 col-md-6 ">
                                        <p>Cep - {info.cep}</p>
                                    </div>
                                    <div className="form-group col-lg-6 ">
                                        <p>Cidade - {info.cidade}</p>
                                    </div>
                                    <div className="form-group col-lg-6 ">
                                        <p>Complemento - {info.complemento}</p>
                                    </div>
                                    <div className="form-group col-lg-6 ">
                                        <p>Cpf - {info.cpf}</p>
                                    </div>
                                    <div className="form-group col-lg-6 ">
                                        <p>Estado - {info.estado}</p>
                                    </div>
                                    <div className="form-group col-lg-6 ">
                                        <p>Sobrenome - {info.lastName}</p>
                                    </div>
                                    <div className="form-group col-lg-6 ">
                                        <p>Nome - {info.name}</p>
                                    </div>
                                    <div className="form-group col-lg-6 ">
                                        <p>Nº da Casa - {info.numero}</p>
                                    </div>
                                    <div className="form-group col-lg-6 ">
                                        <p>Rua - {info.rua}</p>
                                    </div>
                                </div>
                            </form>
                            <button onClick={this.changeScreen.bind(this)} className="primary-btn submit_btn">Editar Perfil</button>
                        </div>
                    </div>
                </div>
            );
        } else {
            return(
                <div>
                    <NavBar />
                    <Banner title="Perfil"/>
                    {this.state.showSuccess && <Alert variant={'success'} className={this.state.success.animation}> {this.state.success.description} </Alert>}
                    {this.state.showError && <Alert variant={'danger'} className={this.state.error.animation}> {this.state.error.description} </Alert>}
                    <section className="checkout_area section_gap" >
                        <div className="billing_details">
                            <div className="row">
                                <div className="col-lg-8" style= {{margin: "auto"}}>
                                    <h3 style={{textAlign: "center"}}>Editar Perfil</h3>
                                    <form class="row contact_form" action="#" method="post" novalidate="novalidate" onSubmit={this.save}>
                                        <div className="col-md-6 form-group p_star" style={{ margin: "0 auto"}}>
                                        <div className="card-body">
                                                <div className="col-md-6 form-group p_star">
                                                    <label htmlFor="name">Nome: </label>
                                                    <input type="text" className="form-control" id="first" name="name" onChange={(event) => this.setState({ name: event.target.value })} value={this.state.name} /><br />
                                                    
                                                </div>
                                                <div className="col-md-6 form-group p_star">
                                                    <label htmlFor="lastname">Sobrenome: </label>
                                                    <input type="text" className="form-control" id="last" name="name" onChange={(event) => this.setState({ lastName: event.target.value })} value={this.state.lastName}/><br />
                                                    
                                                </div>
                                                <div className="col-md-12 form-group p_star">
                                                    <label htmlFor="username">Username: </label>
                                                    <input className="form-control" id="username" name="username" type="text" onChange={(event) => this.setState({ username: event.target.value })} value={this.state.username}/><br />
                                                </div>
                                                <div className="col-md-6 form-group p_star">
                                                    <label htmlFor="cpf">cpf: </label>
                                                    <input type="text" className="form-control" id="number" name="number" onChange={(event) => this.setState({ cpf: event.target.value })} value={this.state.cpf}/><br />
                                                    
                                                </div>
                                                <div className="col-md-6 form-group p_star">
                                                    <label htmlFor="state">Estado: </label>
                                                    <input type="text" className="form-control" id="email" name="compemailany" onChange={(event) => this.setState({ estado: event.target.value })} value={this.state.estado}/><br />
                                                    
                                                </div>
                                                <div className="col-md-6 form-group p_star">
                                                    <label htmlFor="city">Cidade: </label>
                                                    <input type="text" className="form-control" id="number" name="number" onChange={(event) => this.setState({ cidade: event.target.value })} value={this.state.cidade}/><br />
                                                    
                                                </div>
                                                <div className="col-md-6 form-group p_star">
                                                    <label htmlFor="cep">Cep: </label>
                                                    <input type="text" className="form-control" id="city" name="city" onChange={(event) => this.setState({ cep: event.target.value })} value={this.state.cep}/><br />
                                                    
                                                </div>
                                                <div className="col-md-12 form-group p_star">
                                                    <label htmlFor="neighborhood">Bairro: </label>
                                                    <input className="form-control" id="neighborhood" name="neighborhood" type="text" onChange={(event) => this.setState({ bairro: event.target.value })} value={this.state.bairro}/><br />
                                                </div>
                                                <div className="col-md-12 form-group p_star">
                                                    <label htmlFor="street">Rua: </label>
                                                    <input className="form-control" id="street" name="street" type="text" onChange={(event) => this.setState({ rua: event.target.value })} value={this.state.rua}/><br />
                                                </div>
                                                <div className="col-md-12 form-group p_star">
                                                    <label htmlFor="number">Nº da Casa: </label>
                                                    <input className="form-control" id="number" name="number" type="text" onChange={(event) => this.setState({ numero: event.target.value })} value={this.state.numero}/><br />
                                                </div>
                                                <div className="col-md-12 form-group p_star">
                                                    <label htmlFor="complement">Complemento: </label>
                                                    <input className="form-control" id="complement" name="complement" type="text" onChange={(event) => this.setState({ complemento: event.target.value })} value={this.state.complemento}/><br />
                                                </div>
                                                {!this.state.saving &&
                                                    <div className="row" style={{display: "flex", justifyContent: " space-between"}}>
                                                        <button onClick={this.changeScreen.bind(this)} className="genric-btn primary radius">Voltar</button> 
                                                        
                                                        <button type="submit" className="genric-btn primary radius" >Salvar</button>
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
                            </div>
                        </div>
                    </section> 
                    <Footer/>
                </div>          
                       
                
            );
        }
    }
}