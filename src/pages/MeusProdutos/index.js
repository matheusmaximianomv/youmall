import React, { Component } from 'react';

import { db } from './../../config/database';
import { getToken } from './../../services/auth';
import { Redirect } from 'react-router-dom';

export default class MeusProdutos extends Component {

    state = {
        products: [],
        productForDelete: '',
        show: false,
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
            const allProduct = await db.collection('products').get();
            allProduct.forEach(async element => {
                const user = await element.data().responsavel.get();
                if (user.id === getToken().uid) {
                    this.setState({ products: [...this.state.products, { id: element.id, data: element.data() }] })
                }
            });
        } catch (err) {
            return;
        }
    }

    showModal = (id) => {
        this.setState({ show: true, productForDelete: id });
    }

    async deletarProduto(id) {
        this.setState({ show: false });
        try {
            await db.collection('products').doc(id).delete();
            this.setState({ success: { description: 'Produto Registrado com Sucesso.', animation: 'animated bounceIn' } });
            // Tempo para visualizar    
            setTimeout(() => {
                this.setState({ success: { description: 'Produto Deletado com Sucesso.', animation: 'animated bounceOutRight' } });
            }, 5000);
            // Tempo para retornar 
            setTimeout(() => {
                this.setState({ success: { description: '', animation: '' }, show: false });
                }, 5500);
                return <Redirect to="/app/produtos/meus-produtos" />;   
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
        }
    }

    render() {
        return (
            <div className="container">
                {this.state.erro.description && <div id="erro" className={`alert alert-danger mt-2 mb-2 ${this.state.erro.animation}`} role="alert"> {this.state.erro.description}</div>}
                {this.state.success.description && <div id="erro" className={`alert alert-success mt-2 mb-2 ${this.state.success.animation}`} role="alert"> {this.state.success.description}</div>}
                <h1>Meus Produtos - {getToken().database.username}</h1>
                {this.state.show &&
                    <div>
                        <div className="modal fade" id="ExemploModalCentralizado" tabindex="-1" role="dialog" aria-labelledby="TituloModalCentralizado" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="TituloModalCentralizado">Atenção</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Fechar">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        Você realmente deseja excluir o item de sua vitrine, após sua exclusão nenhum outro usuário poderá compra-lo ou fazer um pedido.
                                </div>
                                    <div className="modal-footer">
                                        <button type="button" onClick={() => this.setState({ show: false })} className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                                        <button type="button" onClick={() => this.deletarProduto(this.state.productForDelete)} className="btn btn-danger">Deletar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
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
                        {this.state.products.map(product => (
                            <tr key={product.id}>
                                <th scope="col">{product.id}</th>
                                <th scope="col">{product.data.name}</th>
                                <th scope="col">{product.data.tipo}</th>
                                <th scope="col">{product.data.quantidade}</th>
                                <th scope="col">{product.data.preco}</th>
                                <th scope="col">
                                    <span style={{ cursor: "pointer" }} className='mr-2' onClick={() => { }}>Editar</span>
                                    {/* <span style={{ cursor: "pointer" }} onClick={() => this.deletarProduto(product.id)}>Excluir</span> */}
                                    <button type="button" onClick={() => this.showModal(product.id)} className="btn btn-danger" data-toggle="modal" data-target="#ExemploModalCentralizado">Remover</button>
                                </th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }

}