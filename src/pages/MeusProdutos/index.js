import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';

import { db } from './../../config/database';
import { getToken } from './../../services/auth';
import { Link } from 'react-router-dom';

export default class MeusProdutos extends Component {

    state = {
        products: [],
        productForDelete: '',
        show: false,
        loading: true,
        erro: {
            description: '',
            animation: ''
        },
        success: {
            description: '',
            animation: ''
        },
    }

    async componentWillMount() {
        try {
            this.setState({ loading : true});
            const allProduct = await db.collection('products').get();
            allProduct.forEach(async element => {
                const user = await element.data().responsavel.get();
                if (user.id === getToken().uid) {
                    this.setState({ products: [...this.state.products, { id: element.id, data: element.data() }] })
                    this.setState({ loading : false});
                } else if(user.id) {
                    this.setState({ loading : false});
                }
            });
            return;
        } catch (err) {
            return;
        }
    }

    handleClose = () => {
        this.setState({ show: false });
    }

    handleShow = (id) => {
        this.setState({ show: true, productForDelete : id });
    }

    async deletarProduto(id) {
        try {
            await db.collection('products').doc(id).delete();
            this.setState({ success: { description: 'Produto Deletado com Sucesso.', animation: 'animated bounceIn' } });
            // Tempo para visualizar    
            setTimeout(() => {
                this.setState({ success: { description: 'Produto Deletado com Sucesso.', animation: 'animated bounceOutRight' } });
            }, 5000);
            // Tempo para retornar 
            setTimeout(() => {
                this.setState({ success: { description: '', animation: '' }, show: false });
            }, 5500);
            this.handleClose();
            window.location.reload();
            return;   
        } catch (err) {
            this.setState({ erro: { description: 'Falha na Remoção', animation: 'animated bounceIn' } });
            // Tempo para visualizar
            setTimeout(() => {
                this.setState({ erro: { description: 'Falha na Remoção', animation: 'animated bounceOutRight' } });
            }, 5000);
            // Tempo para retornar 
            setTimeout(() => {
                this.setState({ erro: { description: '', animation: '' } });
            }, 5500);
            this.handleClose();
            return;
        }
    }
    
    render() {
        if(this.state.loading)
            return(
                <div style={{
                    marginTop:'20%',
                    height:'100%',
                    minHeight: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}><div className="spinner-border text-primary" role="status"><span className="sr-only">Loading...</span></div></div>
            );
        return (
            <div className="container">
                {this.state.erro.description && <div id="erro" className={`alert alert-danger mt-2 mb-2 ${this.state.erro.animation}`} role="alert"> {this.state.erro.description}</div>}
                {this.state.success.description && <div id="erro" className={`alert alert-success mt-2 mb-2 ${this.state.success.animation}`} role="alert"> {this.state.success.description}</div>}
                <h1>Meus Produtos - {getToken().database.username}</h1>
                {/* Inicio Modal */}
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Atenção</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Você realmente deseja excluir o item de sua vitrine, após sua exclusão nenhum outro usuário poderá compra-lo ou fazer um pedido.</Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-primary" onClick={this.handleClose}>
                            Fechar
                        </button>
                        <button className="btn btn-danger" onClick={() => this.deletarProduto(this.state.productForDelete)}>
                            Remover
                        </button>
                    </Modal.Footer>
                </Modal>
                {/* Fim Modal */}
                <div className="col-md-2 offset-md-10 mt-4">
                    <Link to="/app/meus-produtos/novo" className="btn btn-success" style={{color:"#FFF", textDecoration:'none'}}>Adicionar Produto</Link>
                </div>
                <table className="table mt-4">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Identificador</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Tipo</th>
                            <th scope="col">Quantidade</th>
                            <th scope="col">Preço</th>
                            <th scope="col">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.products[0] && this.state.products.map(product => (
                            <tr key={product.id}>
                                <th scope="col">{product.id}</th>
                                <th scope="col">{product.data.name}</th>
                                <th scope="col">{product.data.tipo}</th>
                                <th scope="col">{product.data.quantidade}</th>
                                <th scope="col">{product.data.preco}</th>
                                <th scope="col">
                                <button type="button" onClick={() => {}} className="btn btn-primary mr-1">Editar</button>
                                <button type="button" onClick={() => this.handleShow(product.id)} className="btn btn-danger ml-1" data-toggle="modal" data-target="">Remover</button>
                                </th>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {!this.state.products[0] && <p>Nenhum Produto Cadastrado</p> }
            </div>
        );
    }

}