import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { db, storage } from './../../config/database';
import { getToken } from './../../services/auth';

import NavBar from '../../components/NavBar';
import Banner from '../../components/Banner';


export default class NovoProduto extends Component {

    state = {
        nameProduct: "", preco: 0.0, quantidade: 0, descricao: "", tamanho: "", tipo: "", img: null,
        erro: {
            description: '',
            animation: ''
        },
        success: {
            description: '',
            animation: ''
        },
        register: true
    }

    handleImage = event => {
        event.preventDefault(event);
        if (event.target.files[0]) {
            const img = event.target.files[0];
            this.setState({ img });
            return
        }
        return;
    }

    cadastrarProduto = (event) => {
        event.preventDefault(event);
        this.setState({ register: false });
        const { nameProduct, preco, quantidade, descricao, tamanho, tipo, img } = this.state;
        console.log(tipo);

        if (!nameProduct || !preco || !quantidade || !descricao || !tamanho || !tipo || !img) {
            this.setState({ erro: { description: 'Campos Inválidos', animation: 'animated bounceIn' } });
            // Tempo para visualizar
            setTimeout(() => {
                this.setState({ erro: { description: 'Campos Inválidos', animation: 'animated bounceOutRight' } });
            }, 5000);
            // Tempo para retornar 
            setTimeout(() => {
                this.setState({ erro: { description: '', animation: '' } });
            }, 5500);
            this.setState({ register: true });
            return;
        }

        this.setState({register: false});
        const { name } = img;

        const user = db.collection('users').doc(getToken().uid);
        const ref = storage.ref(name);

        ref.put(img).then(imgFile => {
            imgFile.ref.getDownloadURL().then(
                downloadURL => {
                    this.setState({register: false});
                    db.collection('products').doc().set({
                        descricao,
                        name: nameProduct,
                        preco,
                        quantidade,
                        tamanho,
                        tipo,
                        imgUrl: downloadURL,
                        responsavel: user
                    })
                        .then(result => {
                            this.setState({ success: { description: 'Produto Registrado com Sucesso.', animation: 'animated bounceIn' } });
                            // Tempo para visualizar    
                            setTimeout(() => {
                                this.setState({ success: { description: 'Produto Registrado com Sucesso. Aguarde...', animation: 'animated bounceOutRight' } });
                            }, 1500);
                            // Tempo para retornar 
                            setTimeout(() => {
                                this.setState({ success: { description: '', animation: '' }});
                                this.props.history.push("/app/meus-produtos");
                                return;
                            }, 2000);
                        })
                })
            .catch(erro => {
                this.setState({ erro: { description: 'Falha no Cadastro dos Dados', animation: 'animated bounceIn' } });
                // Tempo para visualizar
                setTimeout(() => {
                    this.setState({ erro: { description: 'Falha no Cadastro dos Dados', animation: 'animated bounceOutRight' } });
                }, 5000);
                // Tempo para retornar 
                setTimeout(() => {
                    this.setState({ erro: { description: '', animation: '' } });
                }, 5500);
                this.setState({ register: true });
                return;
            });
        })
        .catch(error => {
            this.setState({ erro: { description: 'Falha no Cadastro', animation: 'animated bounceIn' } });
            // Tempo para visualizar
            setTimeout(() => {
                this.setState({ erro: { description: 'Falha no Cadastro', animation: 'animated bounceOutRight' } });
            }, 5000);
            // Tempo para retornar 
            setTimeout(() => {
                this.setState({ erro: { description: '', animation: '' } });
            }, 5500);
                this.setState({ register: true });
                return;
            });
        this.setState({ register: true });
        return;
    }

    render() {
        console.log(this.state.tipo);
        return (
            <div>
                <NavBar />
                <Banner title="Adicionar Produto" />
                <div className="col-lg-6" style={{marginTop:'0', marginBottom:'0', marginLeft:'auto', marginRight:'auto'}}>
                    
                    <div className="login_box_area section_gap">
                        {this.state.erro.description && <div id="erro" className={`alert alert-danger mt-2 mb-2 ${this.state.erro.animation}`} role="alert"> {this.state.erro.description}</div>}
                        {this.state.success.description && <div id="erro" className={`alert alert-success mt-2 mb-2 ${this.state.success.animation}`} role="alert"> {this.state.success.description}</div>}
                        <form className="row login_form" onSubmit={this.cadastrarProduto}>
                                    <div className="col-md-12 form-group">
                                        <label htmlFor="name">Nome</label>
                                        <input className="form-control" id="name" name="name" type="text" placeholder="Nome do Produto" onChange={event => this.setState({ nameProduct: event.target.value })} />
                                    </div>
                                    <div className="col-md-12 form-group">
                                        <label htmlFor="price">Preço</label>
                                        <input type="number" min="1" step="0.01" className="form-control" id="lastname" placeholder="Preço : 400,50" onChange={event => this.setState({ preco: event.target.value })} />
                                    </div>
                                    <div className="col-md-12 form-group">
                                        <label htmlFor="quantity">Quantidade</label>
                                        <input type="number" className="form-control" id="quantity" min="1" step="1" placeholder="Quantidade de Produtos" onChange={event => this.setState({ quantidade: event.target.value })} />
                                    </div>
                                    <div className="col-md-12 form-group">
                                    <label htmlFor="description">Descrição</label>
                                    <textarea className="form-control" id="description" placeholder="Descrição do Produto" onChange={event => this.setState({ descricao: event.target.value })} />
                                </div>
                                <div className="col-md-12 form-group">
                                    <div className="col-md-12 form-group">
                                        <label htmlFor="size">Tamanho</label>
                                        <input type="text" className="form-control" id="size" placeholder="Tamanhos Disponíveis" onChange={event => this.setState({ tamanho: event.target.value })} />
                                    </div>
                                    <div className="col-md-12 form-group">
                                        <label htmlFor="type">Tipo</label>
                                        <select className="form-control" onChange={event => this.setState({ tipo: event.target.value })}>
                                            <option value="">Seleciona um Tipo</option>
                                            <option value="Calçado">Calçado</option>
                                            <option value="Vestimenta">Vestimenta</option>
                                            <option value="Acessórios">Acessórios</option>
                                            <option value="Outros">Outros</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-12 form-group">
                                    <div className="col-md-12 form-group">
                                        <div className="custom-file">
                                            <input type="file" className="custom-file-input" id="image" onChange={this.handleImage} />
                                            <label className="custom-file-label" htmlFor="image">Escolha uma imagem</label>
                                        </div>
                                    </div>
                                    {this.state.img && <span>Imagem Selecionada : {this.state.img.name}</span>}
                                </div>
                                <div className="col-md-12 form-group">
                                    {this.state.register && <div className="form-group col-md-12 "><button type="submit" className="primary-btn">Cadastrar</button></div>}
                                    {this.state.register && <div className="form-group col-md-12 "><Link to="/app/meus-produtos" className="primary-btn" style={{color: "white"}} >Voltar</Link></div>}
                                    {!this.state.register && <div className="form-group offset-md-6 col-md-2"><div className="spinner-border text-primary" role="status"><span className="sr-only">Loading...</span></div></div>}
                                </div>
                            </form>
                        </div>
                    </div>
            </div>
        );
    }
}