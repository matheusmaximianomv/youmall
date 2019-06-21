/* eslint-disable */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { getCart, cancelPurchase } from './../../services/cart';
import { getToken } from './../../services/auth';
import { db } from './../../config/database';

import NavBar from './../../components/NavBar';
import Banner from './../../components/Banner';
import Footer from './../../components/Footer';

export default class Pagamento extends Component {

    state = {
        products: [],
        finalPrice: 0.0,
        showSuccess : false,
        loading : false,
        success : {
            description : '',
            animation : ''
        },
        showError : false,
        erro: {
            description: '',
            animation: ''
        }
    }

    componentWillMount() {

        const products = getCart();

        if (products) {
            let finalPrice = 0.0;
            products.map(product => {
                finalPrice += parseFloat(product.priceTotal);
            })
            this.setState({ products, finalPrice });
        }
    }

    pagar = async () => {
        const { products } = this.state;

        this.setState({loading : true});

        products.map( async (product) => {
            if(parseInt(product.quantidade) === parseInt(product.quantityMax)) {
                try {
                    const element = await db.collection('products').doc(product.id).get();
                    const author = await element.data().responsavel.get();
                    await db.collection('sales').doc(author.id).collection('products').doc().set({
                        priceTotal : product.priceTotal,
                        id_buyer : getToken().uid,
                        quantity : product.quantidade,
                        id_product : product.id,
                        imgUrl : product.imgUrl,
                        priceUnity : product.price
                    });
                    await db.collection('products').doc(product.id).delete();
                } catch (err) {
                    this.setState({showError : true, erro : { description : 'Não Foi Possível Efetuar o Pagamento', animation : 'animated bounceIn'}});
                    setTimeout(() => {this.setState({showError : false});}, 3000);
                    return;
                }
            } else {
                try {
                    await db.collection('products').doc(product.id).update({
                        quantidade : product.quantityMax - product.quantidade
                    });
                    const element = await db.collection('products').doc(product.id).get();
                    const author = await element.data().responsavel.get();
                    await db.collection('sales').doc(author.id).collection('products').doc().set({
                        priceTotal : product.priceTotal,
                        id_buyer : getToken().uid,
                        quantity : product.quantidade,
                        id_product : product.id,
                        imgUrl : product.imgUrl,
                        priceUnity : product.price
                    });
                } catch (error) {
                    this.setState({showError : true, erro : { description : 'Não Foi Possível Efetuar o Pagamento', animation : 'animated bounceIn'}});
                    setTimeout(() => {this.setState({showError : false});}, 3000);
                    return;
                }
            }
        })
        this.setState({showSuccess : true, success : { description : 'Pagamento Efetuado Com Sucesso', animation : 'animated bounceIn'}});
        setTimeout(() => {this.setState({showSuccess : false});}, 3000);
        setTimeout(() => {cancelPurchase(); window.location.assign('/app/produtos')}, 3500);
        return;
    }

    render() {

        const { products, finalPrice, loading } = this.state;
        console.log(products);

        return (
            <div>
                <NavBar />
                <Banner title="Pagamento" />
                <section className="checkout_area section_gap">
                    <div className="container">
                        <div className="billing_details">
                            <div className="row">
                                <div className="col-lg-6" style={{marginTop : "0px", marginBottom: "0px", marginLeft:"auto", marginRight:"auto"}}>
                                {this.state.erro.description && <div id="erro" className={`alert alert-danger mt-2 mb-2 ${this.state.erro.animation}`} role="alert"> {this.state.erro.description}</div>}
                                {this.state.showSuccess && <div id="erro" className={`alert alert-success mt-2 mb-2 ${this.state.success.animation}`} role="alert"> {this.state.success.description}</div>}
                                    <div className="order_box">
                                        <h2>Sua Lista de Compras</h2>
                                        <ul className="list">
                                            <li><Link to="#">Produto <span>Total</span></Link></li>
                                            {products.map(product => 
                                                <li>
                                                    <Link to="/app/carrinho/pagamento">{product.name} <span className="middle">x {product.quantidade}</span> <span className="last">${product.priceTotal}</span></Link>
                                                </li>
                                            )}
                                        </ul>
                                        <ul className="list list_2">
                                            <li><Link to="#">Total <span>${finalPrice}</span></Link></li>
                                        </ul>
                                        <div className="payment_item">
                                            <div className="radion_btn">
                                                <input type="radio" id="f-option5" name="selector" />
                                                <label for="f-option5">Pagar Por Boleto</label>
                                                <div className="check"></div>
                                            </div>
                                            <p>Please send a check to Store Name, Store Street, Store Town, Store State / County,
                                    Store Postcode.</p>
                                        </div>
                                        <div className="payment_item active">
                                            <div className="radion_btn">
                                                <input type="radio" id="f-option6" name="selector" />
                                                <label for="f-option6">Pague com o Cartão de Crédito </label>
                                                <img src="img/product/card.jpg" alt="" />
                                                <div className="check"></div>
                                            </div>
                                            <p>Pay via PayPal; you can pay with your credit card if you don’t have a PayPal
                                    account.</p>
                                        </div>
                                        <div className="creat_account">
                                            <input type="checkbox" id="f-option4" name="selector" />
                                            <label for="f-option4">Eu li e aceito os</label>
                                            <Link to="#"> Termos &amp; Condições</Link>
                                        </div>
                                        <div className="row">
                                            {!loading && <button type="button" onClick={this.pagar} style={{marginTop : "0px", marginBottom: "0px", marginLeft:"auto", marginRight:"auto"}} className="primary-btn col-md-5" to="#">Pagar</button>}
                                            {loading && <div style={{marginTop : "0px", marginBottom: "0px", marginLeft:"auto", marginRight:"auto"}} className="spinner-border text-primary" role="status"><span className="sr-only">Loading...</span></div>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <Footer />
            </div>
        );
    }
}