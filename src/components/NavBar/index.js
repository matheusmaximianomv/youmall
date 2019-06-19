import React, {Component} from "react";

import { isAuthenticated, getToken } from './../../services/auth'

export default class Banner extends Component{
    render(){

        if(isAuthenticated() && getToken().database.isAdmin){
            return(
            <header className="header_area sticky-header">
                <div className="main_menu">
                    <nav className="navbar navbar-expand-lg navbar-light main_box">
                        <div className="container">
                        
                            <a className="navbar-brand logo_h" href="index.html"><img style={{width : "40%", height:"25%"}} src="img/logo.png" alt=""/></a>
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                        
                            <div className="collapse navbar-collapse offset" id="navbarSupportedContent">
                                <ul className="nav navbar-nav menu_nav ml-auto">
                                    <li className="nav-item"><a className="nav-link" href="index.html">Home</a></li>
                                    <li className="nav-item"><a className="nav-link" href="#">Admin</a></li>
                            
                                    <li className="nav-item submenu dropdown">
                                        <a href="category.html" className="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
                                        aria-expanded="false">Loja</a>
                                        <ul className="dropdown-menu">
                                            <li className="nav-item"><a className="nav-link" href="checkout.html">Meus Produtos</a></li>
                                            <li className="nav-item"><a className="nav-link" href="cart.html">Produtos</a></li>
                                        </ul>
                                    </li>
                                    <li className="nav-item"><a className="nav-link" href="registration.html">Perfil</a></li>
                                    <li className="nav-item"><a className="nav-link" href="registration.html">Sair</a></li>
                                </ul>
                                <ul className="nav navbar-nav navbar-right">
                                    <li className="nav-item"><a href="#" className="cart"><span className="ti-bag"></span></a></li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
                <div >
                    <div className="container">
                    </div>
                </div>
            </header>
            );

        }else if(isAuthenticated()){
            return(
                <header className="header_area sticky-header">
		            <div className="main_menu">
			                <nav className="navbar navbar-expand-lg navbar-light main_box">
                                <div className="container">
                                    <a className="navbar-brand logo_h" href="index.html"><img style={{width : "40%", height:"25%"}} src="img/logo.png" alt="" /></a>
                                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                        <span className="icon-bar"></span>
                                        <span className="icon-bar"></span>
                                        <span className="icon-bar"></span>
                                    </button>
					
                                    <div className="collapse navbar-collapse offset" id="navbarSupportedContent">
                                        <ul className="nav navbar-nav menu_nav ml-auto">
                                            <li className="nav-item"><a className="nav-link" href="index.html">Home</a></li>
                                    
                                            <li className="nav-item submenu dropdown">
                                                <a href="category.html" className="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
                                                aria-expanded="false">Loja</a>
                                                <ul className="dropdown-menu">
                                                    <li className="nav-item"><a className="nav-link" href="checkout.html">Meus Produtos</a></li>
                                                    <li className="nav-item"><a className="nav-link" href="cart.html">Produtos</a></li>
                                                </ul>
                                            </li>
                                                <li className="nav-item"><a className="nav-link" href="registration.html">Perfil</a></li>
                                                <li className="nav-item"><a className="nav-link" href="registration.html">Sair</a></li>
                                        </ul>
                                        <ul className="nav navbar-nav navbar-right">
                                            <li className="nav-item"><a href="#" className="cart"><span className="ti-bag"></span></a></li>
                                        </ul>
                                    </div>
				                </div>
			                </nav>
		            </div>
                <div >
                    <div className="container">
                        
                    </div>
                </div>
	        </header>
            );
        }else{
            return(
                <header class="header_area sticky-header">
		<div class="main_menu">
			<nav class="navbar navbar-expand-lg navbar-light main_box">
				<div class="container">
					
					<a class="navbar-brand logo_h" href="index.html"><img style={{width : "40%", height:"25%"}} src="img/logo.png" alt=""/></a>
					<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
					 aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
					</button>
					
					<div class="collapse navbar-collapse offset" id="navbarSupportedContent">
						<ul class="nav navbar-nav menu_nav ml-auto">
                            <li class="nav-item"><a class="nav-link" href="index.html">Home</a></li>

                            <li class="nav-item"><a class="nav-link" href="registration.html">Cadastrar</a></li>
                            <li class="nav-item"><a class="nav-link" href="login.html">Login</a></li>
						</ul>
					</div>
				</div>
			</nav>
		</div>
		<div>
			<div class="container">
				<form class="d-flex justify-content-between">
				</form>
			</div>
		</div>
	</header>
            );
        }
    };
}