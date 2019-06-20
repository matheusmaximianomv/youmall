import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';

export default class Home extends Component {
    render() {
        return (
            <div>
                <NavBar />
                <section className="banner-area">
                    <div className="container">
                        <div className="row fullscreen align-items-center justify-content-start">
                            <div className="col-lg-12">
                                <div className="active-banner">
                                    <div className="row single d-flex">
                                        <div className="col-lg-5 col-md-6" style={{ padding: "15px" }}>
                                            <div className="banner-content">
                                                <h1>Bem Vindo ao<br />YouMall!</h1>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="features-area section_gap">
                    <div className="container">
                        <div className="row features-inner">
                            <div className="col-lg-3 col-md-6 col-sm-6">
                                <div className="single-features">
                                    <div className="f-icon">
                                        <img src="img/features/f-icon1.png" alt="" />
                                    </div>
                                    <h6>Frete Grátis</h6>
                                    <p>Frete grátis</p>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-6">
                                <div className="single-features">
                                    <div className="f-icon">
                                        <img src="img/features/f-icon2.png" alt="" />
                                    </div>
                                    <h6>Devolução</h6>
                                    <p>Devolução grátis</p>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-6">
                                <div className="single-features">
                                    <div className="f-icon">
                                        <img src="img/features/f-icon3.png" alt="" />
                                    </div>
                                    <h6>Suporte 24 horas</h6>
                                    <p>Atendimento 24 horas por dia</p>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-6">
                                <div className="single-features">
                                    <div className="f-icon">
                                        <img src="img/features/f-icon4.png" alt="" />
                                    </div>
                                    <h6>Pagamento Seguro</h6>
                                    <p>Pagamento livre de golpes</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="category-area">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-8 col-md-12">
                                <div className="row">
                                    <div className="col-lg-8 col-md-8">
                                        <div className="single-deal">
                                            <div className="overlay"></div>
                                            <img className="img-fluid w-100" src="img/category/c1.jpg" alt="" />
                                            <Link to="img/category/c1.jpg" className="img-pop-up" target="_blank">
                                                <div className="deal-details">
                                                    <h6 className="deal-title">Sneaker for Sports</h6>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4">
                                        <div className="single-deal">
                                            <div className="overlay"></div>
                                            <img className="img-fluid w-100" src="/img/l1.jpg" alt="" />
                                            <Link to="img/category/c2.jpg" className="img-pop-up" target="_blank">
                                                <div className="deal-details">
                                                    <h6 className="deal-title">Camisa long-line manga longa</h6>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4">
                                        <div className="single-deal">
                                            <div className="overlay"></div>
                                            <img className="img-fluid w-100" src="/img/l6.jpg" alt="" />
                                            <Link to="img/category/c3.jpg" className="img-pop-up" target="_blank">
                                                <div className="deal-details">
                                                    <h6 className="deal-title">Macacão feminino</h6>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="col-lg-8 col-md-8">
                                        <div className="single-deal">
                                            <div className="overlay"></div>
                                            <img className="img-fluid w-100" src="img/category/c4.jpg" alt="" />
                                            <Link to="img/category/c4.jpg" className="img-pop-up" target="_blank">
                                                <div className="deal-details">
                                                    <h6 className="deal-title">Tênis masculino addidas</h6>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="single-deal">
                                    <div className="overlay"></div>
                                    <img className="img-fluid w-100" src="/img/l8.jpg" alt="" />
                                    <Link to="img/category/c5.jpg" className="img-pop-up" target="_blank">
                                        <div className="deal-details">
                                            <h6 className="deal-title">Camisa xadrez feminina</h6>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="exclusive-deal-area">
                    <div className="container-fluid">
                        <div className="row justify-content-center align-items-center">
                            <div className="col-lg-12 no-padding exclusive-left">
                                <div className="row clock_sec clockdiv" id="clockdiv">
                                    <div className="col-lg-12">
                                        <h1>Black Friday irá terminar em breve!</h1>
                                        <p>Para quem quer economizar.</p>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="row clock-wrap">
                                            <div className="col clockinner1 clockinner">
                                                <h1 className="days">150</h1>
                                                <span className="smalltext">Dias</span>
                                            </div>
                                            <div className="col clockinner clockinner1">
                                                <h1 className="hours">23</h1>
                                                <span className="smalltext">Horas</span>
                                            </div>
                                            <div className="col clockinner clockinner1">
                                                <h1 className="minutes">47</h1>
                                                <span className="smalltext">Min</span>
                                            </div>
                                            <div className="col clockinner clockinner1">
                                                <h1 className="seconds">59</h1>
                                                <span className="smalltext">Seg</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Link to="/registro" className="primary-btn">Comprar Agora</Link>
                            </div>
                        </div>
                    </div>
                </section>
                <Footer />
            </div>
        );
    }
}