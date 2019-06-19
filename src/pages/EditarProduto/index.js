import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Image, Spinner, Alert } from 'react-bootstrap';

import { db, storage } from './../../config/database';
import { getToken } from './../../services/auth';

export default class EditarProduto extends Component {

    state = {
        productId: null,
        productData: null,
        loading: true,
        nameProduct: "", preco: 0.0, quantidade: 0, descricao: "", tamanho: "", tipo: "", img: null,
        loadingSubmit : false,
        showSuccess : false,
        success : {
            description : '',
            animation : ''
        },
        showError : false,
        error : {
            description : '',
            animation : ''
        }
    }

    async componentWillMount() {

        const { id } = this.props.match.params;
        try {
            const product = await db.collection('products').doc(id).get();
            if (product.exists) {
                const user = await product.data().responsavel.get();
                if(user.id === getToken().uid){
                    this.setState({ productId: product.id, productData: product.data() });
                    this.setState({
                        nameProduct: this.state.productData.name , preco: this.state.productData.preco , quantidade: this.state.productData.quantidade, descricao: this.state.productData.descricao , tamanho: this.state.productData.tamanho, tipo: this.state.productData.tipo,
                    });
                    this.setState({ loading: false });
                } else {
                    window.location.href('/app/meus-produtos');    
                }
            } else if (product) {
                window.location.href('/app/meus-produtos');
            }
        } catch (error) {
            window.location.assign('/app/meus-produtos');
        }

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

    alterarProduto = (event) => {
        event.preventDefault(event);
        this.setState({loadingSubmit : true});
        
        const { nameProduct, preco, quantidade, descricao, tamanho, tipo, img } = this.state;

        if(!nameProduct || !preco || !quantidade || !descricao || !tamanho || !tipo) {
            this.setState({showError : true, error : { description : 'Algum Campo está Inválido', animation : 'animated bounceIn'}});
            this.setState({loadingSubmit : false});
            setTimeout(() => {this.setState({showError : false});}, 3000);
            return;    
        }

        const user = db.collection('users').doc(getToken().uid);
        
        // Se alguem quiser trocar a imagem.
        if(img){
            const { name } = img;
            const ref = storage.ref(name);
    
            ref.put(img).then(imgFile => {
                imgFile.ref.getDownloadURL().then(
                    downloadURL => {
                        
                        db.collection('products').doc(this.state.productId).update({
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
                                this.setState({showSuccess : true, success : { description : 'Produto Atualizado com Sucesso', animation : 'animated bounceIn'}});
                                this.setState({loadingSubmit : false});
                                setTimeout(() => {this.setState({showSuccess : false});}, 3000);
                                setTimeout(() => {window.location.reload();}, 3500);
                                return;
                            })
                    })
                .catch(erro => {
                    this.setState({showError : true, error : { description : 'Erro na Atualização, tente novamente mais tarde...', animation : 'animated bounceIn'}});
                    this.setState({loadingSubmit : false});
                    setTimeout(() => {this.setState({showError : false});}, 3000);
                    return;
                });
            })
            return;
        } else {
            // Se alguem não quiser trocar imagem
            db.collection('products').doc(this.state.productId).update({
                descricao,
                name: nameProduct,
                preco,
                quantidade,
                tamanho,
                tipo,
                imgUrl: this.state.productData.imgUrl,
                responsavel: user
            })
                .then(result => {
                    this.setState({showSuccess : true, success : { description : 'Produto Atualizado com Sucesso', animation : 'animated bounceIn'}});
                    this.setState({loadingSubmit : false});
                    setTimeout(() => {this.setState({showSuccess : false});}, 3000);
                    setTimeout(() => {window.location.reload();}, 3500);
                })
                .catch(err => {
                    this.setState({showError : true, error : { description : 'Erro na Atualização, tente novamente mais tarde...', animation : 'animated bounceIn'}});
                    this.setState({loadingSubmit : false});
                    setTimeout(() => {this.setState({showError : false});}, 3000);
                    return;
                })
            return;
        }

    }

    render() {
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
        return (
            <div>
                <div className="container mt-3 mb-3">
                    {this.state.showSuccess && <Alert variant={'success'} className={this.state.success.animation}> {this.state.success.description} </Alert>}
                    {this.state.showError && <Alert variant={'danger'} className={this.state.error.animation}> {this.state.error.description} </Alert>}
                    <h1>Editar o Produto</h1>
                    <Image style={{margin:"2% 42%"}} width="171" height="180" src={this.state.productData.imgUrl} thumbnail />
                    <div className="card">
                        <div className="card-body">
                            <form onSubmit={this.alterarProduto}>
                                <div className="form-row">
                                    <div className="form-group col-md-4">
                                        <label htmlFor="name">Nome</label>
                                        <input type="text" className="form-control" id="name" placeholder="Nome do Produto" onChange={event => this.setState({ nameProduct: event.target.value })} value={this.state.nameProduct}/>
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label htmlFor="price">Preço</label>
                                        <input type="number" min="1" step="0.01" className="form-control" id="price" placeholder="Preço : 400.50" onChange={event => this.setState({ preco: event.target.value })} value={this.state.preco}/>
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label htmlFor="quantity">Quantidade</label>
                                        <input type="number" className="form-control" id="quantity" placeholder="Quantidade de Produtos" onChange={event => this.setState({quantidade : event.target.value})} value={this.state.quantidade}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description">Descrição</label>
                                    <textarea className="form-control" id="description" placeholder="Descrição do Produto" onChange={event => this.setState({ descricao : event.target.value})} value={this.state.descricao}/>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="size">Tamanho</label>
                                        <input type="text" className="form-control" id="size" placeholder="Tamanhos Disponíveis" onChange={event => this.setState({tamanho : event.target.value})} value={this.state.tamanho}/>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="type">Tipo</label>
                                        <select className="form-control" onChange={event => this.setState({tipo : event.target.value})} value={this.state.tipo}>
                                            <option value="">Seleciona um Tipo</option>
                                            <option value="Calçado">Calçado</option>
                                            <option value="Vestimenta">Vestimenta</option>
                                            <option value="Acessórios">Acessórios</option>
                                            <option value="Outros">Outros</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="input-group">
                                        <div className="custom-file">
                                            <input type="file" className="custom-file-input" id="image" onChange={this.handleImage} />
                                            <label className="custom-file-label" htmlFor="image">Selecionar uma nova imagem</label>
                                        </div>
                                    </div>
                                    {this.state.img && <span>Imagem Selecionada : {this.state.img.name}</span>}
                                </div>
                                <div className="form-row mt-3">
                                    {!this.state.loadingSubmit && <Link to="/app/meus-produtos" className="btn btn-primary" style={{color:"#FFF", textDecoration:'none', float:'left'}}>Voltar</Link>}
                                    {!this.state.loadingSubmit && <button type="submit" className="btn btn-success offset-md-10">Salvar</button>}
                                    {this.state.loadingSubmit &&  <Spinner style={{marginLeft:'50%'}} animation="border" variant="primary" />}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}