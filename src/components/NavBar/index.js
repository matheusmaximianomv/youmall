import React, { Component } from "react";
import { Link } from 'react-router-dom';

import { isAuthenticated, getToken, logout } from './../../services/auth';

export default class Banner extends Component {

    sair = () => {
        logout();
        window.location.reload();
    }

    render() {

        if (isAuthenticated() && getToken().database.isAdmin) {
            return (
                <div id="undefined-sticky-wrapper" className="sticky-wrapper" style={{ height: "178px" }} >
                    <header className="header_area sticky-header">
                        <div className="main_menu">
                            <nav className="navbar navbar-expand-lg navbar-light main_box">
                                <div className="container">

                                    <Link className="navbar-brand logo_h" to="/"><img style={{ width: "40%", height: "25%" }} src="https://firebasestorage.googleapis.com/v0/b/youmall.appspot.com/o/logo.png?alt=media&token=2ca94ebd-f798-4f3a-ad1b-023aeac089ad" alt="" /></Link>
                                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                        <span className="icon-bar"></span>
                                        <span className="icon-bar"></span>
                                        <span className="icon-bar"></span>
                                    </button>

                                    <div className="collapse navbar-collapse offset" id="navbarSupportedContent">
                                        <ul className="nav navbar-nav menu_nav ml-auto">
                                            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
                                            <li className="nav-item" style={{ cursor: "pointer" }}><Link to="/app/admin/denuncias" className="nav-link" >Admin</Link></li>

                                            <li className="nav-item submenu dropdown">
                                                <Link className="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
                                                    aria-expanded="false">Loja</Link>
                                                <ul className="dropdown-menu">
                                                    <li className="nav-item"><Link className="nav-link" to="/app/meus-produtos">Meus Produtos</Link></li>
                                                    <li className="nav-item"><Link className="nav-link" to="/app/produtos">Produtos</Link></li>
                                                </ul>
                                            </li>
                                            <li className="nav-item"><Link className="nav-link" to="/app/perfil">Perfil</Link></li>
                                            <li className="nav-item" style={{ cursor: "pointer" }} onClick={this.sair}><Link className="nav-link">Sair</Link></li>
                                        </ul>
                                        <ul className="nav navbar-nav navbar-right">
                                            <li className="nav-item"><Link to="/app/carrinho" className="cart"><i className="fa fa-shopping-cart"></i></Link></li>
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
                </div>
            );

        } else if (isAuthenticated()) {
            return (
                <div id="undefined-sticky-wrapper" className="sticky-wrapper" style={{ height: "178px" }} >
                    <header className="header_area sticky-header">
                        <div className="main_menu">
                            <nav className="navbar navbar-expand-lg navbar-light main_box">
                                <div className="container">
                                    <Link className="navbar-brand logo_h" to="index.html"><img style={{ width: "40%", height: "25%" }} src="https://firebasestorage.googleapis.com/v0/b/youmall.appspot.com/o/logo.png?alt=media&token=2ca94ebd-f798-4f3a-ad1b-023aeac089ad" alt="" /></Link>
                                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                        <span className="icon-bar"></span>
                                        <span className="icon-bar"></span>
                                        <span className="icon-bar"></span>
                                    </button>

                                    <div className="collapse navbar-collapse offset" id="navbarSupportedContent">
                                        <ul className="nav navbar-nav menu_nav ml-auto">
                                            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>

                                            <li className="nav-item submenu dropdown">
                                                <Link className="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
                                                    aria-expanded="false">Loja</Link>
                                                <ul className="dropdown-menu">
                                                    <li className="nav-item"><Link className="nav-link" to="/app/meus-produtos">Meus Produtos</Link></li>
                                                    <li className="nav-item"><Link className="nav-link" to="/app/produtos">Produtos</Link></li>
                                                </ul>
                                            </li>
                                            <li className="nav-item"><Link className="nav-link" to="/app/perfil">Perfil</Link></li>
                                            <li className="nav-item" style={{ cursor: "pointer" }} onClick={this.sair}><Link className="nav-link">Sair</Link></li>
                                        </ul>
                                        <ul className="nav navbar-nav navbar-right">
                                            <li className="nav-item"><Link to="/app/carrinho" className="cart"><span className="ti-bag"></span></Link></li>
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
                </div>
            );
        } else {
            return (
                <div id="undefined-sticky-wrapper" className="sticky-wrapper" style={{ height: "178px" }} >
                    <header className="header_area sticky-header">
                        <div className="main_menu">
                            <nav className="navbar navbar-expand-lg navbar-light main_box">
                                <div className="container">

                                    <Link className="navbar-brand logo_h" to="index.html"><img style={{ width: "40%", height: "25%" }} src="https://firebasestorage.googleapis.com/v0/b/youmall.appspot.com/o/logo.png?alt=media&token=2ca94ebd-f798-4f3a-ad1b-023aeac089ad" alt="" /></Link>
                                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                        <span className="icon-bar"></span>
                                        <span className="icon-bar"></span>
                                        <span className="icon-bar"></span>
                                    </button>

                                    <div className="collapse navbar-collapse offset" id="navbarSupportedContent">
                                        <ul className="nav navbar-nav menu_nav ml-auto">
                                            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>

                                            <li className="nav-item"><Link className="nav-link" to="/registro">Cadastrar</Link></li>
                                            <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </nav>
                        </div>
                        <div>
                            <div className="container">
                                <form className="d-flex justify-content-between">
                                </form>
                            </div>
                        </div>
                    </header>
                </div>
            );
        }
    };
}