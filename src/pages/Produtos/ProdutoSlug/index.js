import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { db } from './../../../config/database';
import { getToken } from './../../../services/auth';
import { insertInCart } from './../../../services/cart';

import Banner from './../../../components/Banner';
import Footer from './../../../components/Footer';
import NavBar from './../../../components/NavBar';

export default class ProductSlug extends Component {
    state = {
        product: {},
        loading: true,
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
    }

    async componentWillMount() {
        const { slug_product } = this.props.match.params;
        try {
            const product = await db.collection('products').doc(slug_product).get()
            if (product.exists) {
                const user = await product.data().responsavel.get();
                if (user.id !== getToken().uid) {
                    this.setState({ product: {id : product.id, data : product.data() }});
                    this.setState({ loading: false });
                } else {
                    window.location.assign('/app/produtos');
                }
            } else {
                window.location.assign('/app/produtos');
            }
        } catch (err) {
            window.location.assign('/app/produtos');
        }
    }

    adicionarCarrinho = (product) => {
        try {
            insertInCart(product);
            this.setState({showSuccess : true, success : { description : 'Produto Adicionado no Carrinho com Sucesso.', animation : 'animated bounceIn'}});
            setTimeout(() => {this.setState({showSuccess : false});}, 3000);
            setTimeout(() => {window.location.assign('/app/carrinho');}, 3500);
        } catch(err) {
            this.setState({showError : true, error : { description : 'Não foi possível adicionar o produto no carrinho', animation : 'animated bounceIn'}});
            setTimeout(() => {this.setState({showError : false});}, 3000);
            setTimeout(() => {window.location.assign('/app/carrinho');}, 3500);
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
        const {product} = this.state;
        console.log(product.data.imgUrl);
        return (
            <div>
                <NavBar />
                <Banner title={product.data.name} />
                {/* <!--================Single Product Area =================--> */}
                <div className="product_image_area mb-5">
                    <div className="container">
                        {this.state.showError && <div id="erro" className={`alert alert-danger mt-2 mb-2 ${this.state.erro.animation}`} role="alert"> {this.state.erro.description}</div>}
                        {this.state.showSuccess && <div id="erro" className={`alert alert-success mt-2 mb-2 ${this.state.success.animation}`} role="alert"> {this.state.success.description}</div>}
                        <div className="row s_product_inner">
                            <div className="col-lg-6">
                                <div className="s_Product_carousel">
                                    <div className="single-prd-item">
                                        <img className="img-fluid" style={{height : "600", width : "555"}} src={product.data.imgUrl} alt="" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-5 offset-lg-1">
                                <div className="s_product_text">
                                    <h3>{product.data.name}</h3>
                                    <h2>${parseInt(product.data.preco)}</h2>
                                    <ul className="list">
                                        <li><Link className="active"><span>Categoria: </span>{product.data.tipo}</Link></li>
                                        <li><Link><span>Quantidade: </span>{product.data.quantidade}</Link></li>
                                    </ul>
                                    <p>{product.data.descricao}</p>
                                    <div className="card_area d-flex align-items-center">
                                        <Link className="primary-btn" onClick={() => this.adicionarCarrinho(product)}>Adicionar ao Carrinho</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}