import React, { Component } from 'react';
import { Modal, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { db } from '../../config/database';
import { getToken } from '../../services/auth';
import { insertInCart, getCart } from '../../services/cart';

import Banner from '../../components/Banner';
import NavBar from '../../components/NavBar';

export default class Produtos extends Component {

    state = {
        loading: true,
        allProducts: [],
        show: false,
        productForComplaint: {},
        categoria: '',
        mensagem: '',
        showSuccess: false,
        success: {
            description: '',
            animation: ''
        },
        showError: false,
        error: {
            description: '',
            animation: ''
        },
        productsIds: []
    }

    handleClose = () => {
        this.setState({ show: false });
    }

    handleShow = (product) => {
        this.setState({ show: true, productForComplaint: product });
    }

    async componentWillMount() {
        try {
            const allProducts = await db.collection('products').get();
            allProducts.forEach(async product => {
                const user = await product.data().responsavel.get();
                if (user.id !== getToken().uid) {
                    this.setState({ allProducts: [...this.state.allProducts, { id: product.id, data: product.data(), author: user.data().username }] });
                    this.setState({ loading: false });
                } else if (user.id) {
                    this.setState({ loading: false });
                }
            });
            const productInCart = getCart();
            // eslint-disable-next-line
            productInCart.map(product => {
                this.setState({ productsIds: [...this.state.productsIds, product.id] });
            });
            return;
        } catch (err) {
            return;
        }
    }

    denunciarItem = async () => {
        try {
            const rementente = await db.collection('users').doc(getToken().uid);
            const destinatario = this.state.productForComplaint.data.responsavel;
            const item = await db.collection('products').doc(this.state.productForComplaint.id);
            await db.collection('denunciations').doc().set({
                rementente,
                destinatario,
                item,
                categoria: this.state.categoria,
                mensagem: this.state.mensagem
            }).then(result => {
                this.handleClose();
                this.setState({ showSuccess: true, success: { description: 'Denúncia Enviada com Sucesso para Análise', animation: 'animated bounceIn' } });
                setTimeout(() => { this.setState({ showSuccess: false }); }, 3000);
            }).catch(err => {
                this.handleClose();
                this.setState({ showError: true, error: { description: 'Não foi Possível Enviar sua Denúncia, Tente Novamente Mais Tarde...', animation: 'animated bounceIn' } });
                setTimeout(() => { this.setState({ showError: false }); }, 3000);
            })
        } catch (error) {
            this.handleClose();
            this.setState({ showError: true, error: { description: 'Não foi Possível Enviar sua Denúncia, Tente Novamente Mais Tarde...', animation: 'animated bounceIn' } });
            setTimeout(() => { this.setState({ showError: false }); }, 3000);
        }
    }

    adicionarCarrinho = (product) => {
        const { productsIds } = this.state;
        if (productsIds.indexOf(product.id) > -1) {
            this.setState({ showError: true, error: { description: 'Você Já Adicionou esse produto ao seu carrinho', animation: 'animated bounceIn' } });
            setTimeout(() => { this.setState({ showError: false }); }, 3000);
        } else {
            insertInCart(product);
            this.setState({ productsIds: [...this.state.productsIds, product.id] });
            this.setState({ showSuccess: true, success: { description: 'Produto Adicionado ao Seu Carrinho', animation: 'animated bounceIn' } });
            setTimeout(() => { this.setState({ showSuccess: false }); }, 3000);
        }
        return;
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
                <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Denúncia</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ textAlign: 'justify' }}>Aqui você poderá denunciar produtos que tenha cunho imoral, falso, ilegal e inapropriado. Se você denunciar muitas vezes e se suas denuncias não tiverem compativeis com a realidade, você poderá ser penalizado na plataforma.</Modal.Body>
                    <Modal.Body>
                        <form>
                            <div className="form-group">
                                <label htmlFor="categoria-denuncia" className="col-form-label">Categoria da Denúncia</label>
                                <select onChange={event => this.setState({ categoria: event.target.value })} className="form-control" id="categoria-denuncia">
                                    <option value="">Selecione um Categoria</option>
                                    <option value="item-falso">Item Falso</option>
                                    <option value="inapropriado">Inapropriado</option>
                                    <option value="ilegal">Ilegal</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="mensagem" className="col-form-label">Message:</label>
                                <textarea className="form-control" onChange={event => this.setState({ mensagem: event.target.value })} id="mensagem" required></textarea>
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="button" className="btn btn-primary" onClick={this.handleClose}>
                            Fechar
                        </button>
                        <button type="submit" onClick={this.denunciarItem} className="btn btn-danger">
                            Denunciar
                        </button>
                    </Modal.Footer>
                </Modal>
                <NavBar />
                <Banner title="Produtos" />
                <div className="container">
                    <div className="row">
                        <div style={{marginBottom : "0px", marginTop: "0px", marginLeft:"auto", marginRight:"auto"}} className="col-xl-9 col-lg-8 col-md-7">
                            <section className="lattest-product-area pb-40 category-list mt-4 mb-4">
                                {this.state.showSuccess && <Alert variant={'success'} className={this.state.success.animation}> {this.state.success.description} </Alert>}
                                {this.state.showError && <Alert variant={'danger'} className={this.state.error.animation}> {this.state.error.description} </Alert>}
                                <div className="row">
                                    {/* Agora Vai */}
                                    {this.state.allProducts.map(product => (
                                        <div key={product.id} className="col-lg-4 col-md-6">
							                <div className="single-product">
								                <img className="img-fluid" style={{ width: "280px", height:"262px"}} src={product.data.imgUrl} alt="" />
                                                <div className="product-details">
                                                    <h6>{product.data.name}</h6>
                                                    <div className="price">
                                                        <h6>R${parseFloat(product.data.preco)}</h6>
                                                    </div>
                                                    <div className="prd-bottom">
                                                        <Link onClick={() => this.adicionarCarrinho(product)} className="social-info">
                                                            <span>+</span>
                                                            <p className="hover-text">Adicionar</p>
                                                        </Link>
                                                        <Link to={`/app/produtos/${product.id}`} className="social-info">
                                                            <span>V</span>
                                                            <p className="hover-text">Ver Mais</p>
                                                        </Link>
                                                        <Link onClick={() => this.handleShow(product)} className="social-info">
                                                            <span>D</span>
                                                            <p className="hover-text">Denunciar</p>
                                                        </Link>
                                                    </div>
								                </div>
							                </div>
						                </div>

                                    ))}
                                    {/* Agora Vai Terminou */}
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}