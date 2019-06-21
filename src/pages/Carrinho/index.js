// eslint-disable-next-line
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { getCart, removeFromCart } from './../../services/cart';

import NavBar from './../../components/NavBar';
import Banner from './../../components/Banner';
import Footer from './../../components/Footer';

export default class Carrinho extends Component {

    state = {
        products: [],
        finalPrice: 0.0,
    }

    componentWillMount() {
        const products = getCart();
        if(products) {
            let finalPrice = 0.0;
            // eslint-disable-next-line
            products.map(product => {
                finalPrice += parseFloat(product.priceTotal);
            })
            this.setState({ products, finalPrice });
        }
    }

    calcularProduto = (indexProduct) => {
        const { products } = this.state;
        let numero = 0.0, finalPrice = 0.0;
        // eslint-disable-next-line
        products.map((element, index) => {
            if(index === indexProduct) {
                element.priceTotal = parseFloat(element.quantidade * element.price);
                numero = element.priceTotal;
            }
        });
        // eslint-disable-next-line
        products.map(product => {
            finalPrice += parseFloat(product.priceTotal);
        })
        this.setState({ products, finalPrice });
        return numero;
    }

    adicionarItem = (indexProduct) => {
        const { products } = this.state;
        // eslint-disable-next-line
        products.map((element, index) => {
            if(index === indexProduct) {
                if(parseInt(element.quantidade) + 1 <= parseInt(element.quantityMax)){
                    element.quantidade = parseInt(element.quantidade) + 1;
                }
            }
        });
        this.calcularProduto(indexProduct);
        this.setState({ products });
        return;
    }

    removerItem = (indexProduct) => {
        const { products } = this.state;
        // eslint-disable-next-line
        products.map((element, index) => {
            if(index === indexProduct) {
                if(parseInt(element.quantidade) - 1 > 0) {
                    element.quantidade = parseInt(element.quantidade) - 1;
                }
            }
        });
        this.calcularProduto(indexProduct);
        this.setState({ products });
        return;
    }

    apagarDoCarrinho = (indexProduct) => {
        removeFromCart(indexProduct);
        window.location.reload();
    }

    render() {

        const { products } = this.state;

        return (
            <div>
                <NavBar />
                <Banner title="Seu Carrinho" />
                <section className="cart_area">
                    <div className="container">
                        <div className="cart_inner">
                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Produto</th>
                                            <th scope="col">Preço</th>
                                            <th scope="col">Quantidade</th>
                                            <th scope="col">Total</th>
                                            <th scope="col">Ação</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {!products[0] && 
                                            <tr>
                                                <td>Não Existe nenhum produto no seu carrinho</td>
                                                <td>$0.00</td>
                                                <td>0</td>
                                                <td>$0.00</td>
                                                <td></td>
                                            </tr>
                                        }
                                        {products[0] && products.map((product, index) => (
                                            <tr key={product.id}>
                                                <td>
                                                    <div className="media">
                                                        {/* Imagem 150x100 */}
                                                        <div className="d-flex">
                                                            <img width="150px" height="100px" src={product.imgUrl} alt="" />
                                                        </div>
                                                        <div className="media-body">
                                                            {/* Nome */}
                                                            <p>{product.name}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    {/* Preço */}
                                                    <h5>${parseFloat(product.price)}</h5>
                                                </td>
                                                <td>
                                                    <div className="product_count">
                                                        {/* <input type="number" min="1" step="1" max={product.quantityMax} defaultValue={1} className="form-control" id="price" autoComplete="off"/> */}
                                                        <input type="text" name="qty" id="sst" max={product.quantityMax} value={product.quantidade}
                                                        title="Quantity:" className="input-text qty" autoComplete="off"/>
                                                        {/* Controle da Quantidade de Itens */}
                                                        <button onClick={() => this.adicionarItem(index)} className="increase items-count" type="button"><i className="lnr lnr-chevron-up"></i></button>
                                                        <button onClick={() => this.removerItem(index)} className="reduced items-count" type="button"><i className="lnr lnr-chevron-down"></i></button>
                                                    </div>
                                                </td>
                                                <td>
                                                    {/* Preço total */}
                                                    <h5>${product.priceTotal}</h5>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <button type="button" className="genric-btn danger circle" onClick={()=> this.apagarDoCarrinho(index)}>Excluir</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                        <tr className="bottom_button mb-2">
                                            <td>
                                                <Link className="gray_btn mr-1" to="/app/produtos">Continuar Comprando</Link>
                                            </td>
                                            <td></td>
                                            <td></td>
                                            <td>
                                                <h5>Total</h5>
                                            </td>
                                            <td>
                                                <h5>${this.state.finalPrice}</h5>
                                            </td>
                                        </tr>
                                        <div className="row mt-5">
                                            {products[0] &&
                                            <div className="offset-md-9  col-md-5">
                                                <Link className="primary-btn" to="/app/carrinho/pagamento">Finalizar Compra</Link>
                                            </div>
                                            }
                                        </div>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>
                <Footer />
            </div>
        );
    }
}