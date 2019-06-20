import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Footer from '../../components/Footer';

export default class EditarPerfil extends Component{
    render(){
        return(
            <div>
                <section className="checkout_area section_gap">
                    <div className="billing_details">
                        <div className="row">
                            <div className="col-lg-8" style={{margin: "auto"}}>
                                <form className="row contact_form" action="#" method="post" novalidate="novalidate">
                                    <div className="col-md-6 form-group p_star">
                                        <input type="text" className="form-control" id="first" name="name"/>
                                        <span className="placeholder" data-placeholder="Nome"></span>
                                    </div>
                                    <div className="col-md-6 form-group p_star">
                                        <input type="text" className="form-control" id="last" name="name"/>
                                        <span className="placeholder" data-placeholder="Sobrenome"></span>
                                    </div>
                                    <div className="col-md-6 form-group p_star">
                                        <input type="text" className="form-control" id="number" name="number"/>
                                        <span className="placeholder" data-placeholder="CEP"></span>
                                    </div>
                                    <div className="col-md-6 form-group p_star">
                                        <input type="text" className="form-control" id="email" name="compemailany"/>
                                        <span className="placeholder" data-placeholder="Rua"></span>
                                    </div>
                                    <div className="col-md-6 form-group p_star">
                                        <input type="text" className="form-control" id="number" name="number"/>
                                        <span className="placeholder" data-placeholder="Bairro"></span>
                                    </div>
                                    <div className="col-md-6 form-group p_star">
                                        <input type="text" className="form-control" id="number" name="number"/>
                                        <span className="placeholder" data-placeholder="Nº da Casa"></span>
                                    </div>
                                    <div className="col-md-12 form-group p_star">
                                        <input type="text" className="form-control" id="city" name="city"/>
                                        <span className="placeholder" data-placeholder="Complemento"></span>
                                    </div>
                            
                                </form>
                                <a href="#" className="genric-btn primary radius">Salvar</a>
                            </div>
                    
                            
                        </div>
                    </div>
                </section>
                <Footer/>
            </div>
            
        );
    }
}