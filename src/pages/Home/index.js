import React, {Component} from 'react';

import NavBar from '../../components/NavBar';

export default class Home extends Component{
    render(){
        return(
            <div>
                <NavBar/>
	            <section className="banner-area">
                    <div className="container">
                        <div className="row fullscreen align-items-center justify-content-start">
                            <div className="col-lg-12">
                                <div className="active-banner">
                                    
                                    <div className="row single d-flex">
                                        <div className="col-lg-5 col-md-6" style={{padding:"15px"}}>
                                            <div className="banner-content">
                                                <h1><br/><br/>Bem Vindo ao<br/>YouMall!</h1>
                                                
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
                                            <a href="img/category/c1.jpg" className="img-pop-up" target="_blank">
                                                <div className="deal-details">
                                                    <h6 className="deal-title">Sneaker for Sports</h6>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4">
                                        <div className="single-deal">
                                            <div className="overlay"></div>
                                            <img className="img-fluid w-100" src="/img/l1.jpg" alt="" />
                                            <a href="img/category/c2.jpg" className="img-pop-up" target="_blank">
                                                <div className="deal-details">
                                                    <h6 className="deal-title">Camisa long-line manga longa</h6>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4">
                                        <div className="single-deal">
                                            <div className="overlay"></div>
                                            <img className="img-fluid w-100" src="/img/l6.jpg" alt="" />
                                            <a href="img/category/c3.jpg" className="img-pop-up" target="_blank">
                                                <div className="deal-details">
                                                    <h6 className="deal-title">Macacão feminino</h6>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="col-lg-8 col-md-8">
                                        <div className="single-deal">
                                            <div className="overlay"></div>
                                            <img className="img-fluid w-100" src="img/category/c4.jpg" alt="" />
                                            <a href="img/category/c4.jpg" className="img-pop-up" target="_blank">
                                                <div className="deal-details">
                                                    <h6 className="deal-title">Tênis masculino addidas</h6>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="single-deal">
                                    <div className="overlay"></div>
                                    <img className="img-fluid w-100" src="/img/l8.jpg" alt="" />
                                    <a href="img/category/c5.jpg" className="img-pop-up" target="_blank">
                                        <div className="deal-details">
                                            <h6 className="deal-title">Camisa xadrez feminina</h6>
                                        </div>
                                    </a>
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
                                <a href="" className="primary-btn">Comprar Agora</a>
                            </div>
                            
                        </div>
                    </div>
                </section>
                <footer className="footer-area section_gap">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3  col-md-6 col-sm-6">
                                <div className="single-footer-widget">
                                    <h6>Sobre nós</h6>
                                    <p>
                                        Somos uma empresa que auxilia você na compra e venda de produtos.
                                    </p>
                                </div>
                            </div>
                            <div className="col-lg-4  col-md-6 col-sm-6">
                                <div className="single-footer-widget">
                                    <h6>Fique por dentro</h6>
                                    <p>Receba novidades sobre nosso site</p>
                                    <div className="" id="mc_embed_signup">

                                        <form target="_blank" novalidate="true" action="https://spondonit.us12.list-manage.com/subscribe/post?u=1462626880ade1ac87bd9c93a&amp;id=92a4423d01"
                                        method="get" className="form-inline">

                                            <div className="d-flex flex-row">

                                                <input className="form-control" name="EMAIL" placeholder="Enter Email" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Enter Email '"
                                                required="" type="email" />


                                                <button className="click-btn btn btn-default"><i className="fa fa-long-arrow-right" aria-hidden="true"></i></button>
                                                <div style={{position: "absolute", left: "-5000px"}}>
                                                    <input name="b_36c4fd991d266f23781ded980_aefe40901a" tabindex="-1" value="" type="text" />
                                                </div>

                                            </div>
                                            <div className="info"></div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3  col-md-6 col-sm-6">
                                <div className="single-footer-widget mail-chimp">
                                    <h6 className="mb-20">Instragram Feed</h6>
                                    <ul className="instafeed d-flex flex-wrap">
                                        <li><img src="img/i1.jpg" alt="" /></li>
                                        <li><img src="img/i2.jpg" alt="" /></li>
                                        <li><img src="img/i3.jpg" alt="" /></li>
                                        <li><img src="img/i4.jpg" alt="" /></li>
                                        <li><img src="img/i5.jpg" alt="" /></li>
                                        <li><img src="img/i6.jpg" alt="" /></li>
                                        <li><img src="img/i7.jpg" alt="" /></li>
                                        <li><img src="img/i8.jpg" alt="" /></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-6 col-sm-6">
                                <div className="single-footer-widget">
                                    <h6>Siga-nos</h6>
                                    <p>Siga-nos nas redes sociais</p>
                                    <div className="footer-social d-flex align-items-center">
                                        <a href="#"><i className="fa fa-facebook"></i></a>
                                        <a href="#"><i className="fa fa-twitter"></i></a>
                                        <a href="#"><i className="fa fa-dribbble"></i></a>
                                        <a href="#"><i className="fa fa-behance"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="footer-bottom d-flex justify-content-center align-items-center flex-wrap">
                            <p className="footer-text m-0">
                Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved | This template is made with <i className="fa fa-heart-o" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank">Colorlib</a>
                </p>
                        </div>
                    </div>
                </footer>
            </div>
        );
    }
}