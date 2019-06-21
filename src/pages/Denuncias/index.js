import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { db }  from './../../config/database';

import NavBar from './../../components/NavBar';
import Banner from './../../components/Banner';
import Footer from './../../components/Footer';

export default class Denuncias extends Component {

    state = {
        loading : true,
        denunciations : []
    }

    async componentWillMount() {
        try {
            const denuncias = await db.collection('denunciations').get();
            if(denuncias.empty){
                this.setState({loading : false});
                return;
            }
            denuncias.forEach(async denuncia => {
                this.setState({loading : true});
                const denunciador = await denuncia.data().rementente.get();
                const denunciado = await denuncia.data().destinatario.get();
                const item = await denuncia.data().item.get();
                const complaint = {
                    id : denuncia.id,
                    denunciador : denunciador.data().username,
                    denunciado : denunciado.data().username,
                    item: item.data().name
                }
                this.setState({ denunciations : [...this.state.denunciations, complaint]});
                this.setState({loading : false});
            });
            return;
        } catch (error) {
            window.location.assign('/');
        }
    }

    render() {
        if(this.state.loading)
            return(
                <div style={{
                    marginTop:'20%',
                    height:'100%',
                    minHeight: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}><div className="spinner-border text-primary" role="status"><span className="sr-only">Loading...</span></div></div>
            );

        const { denunciations } = this.state;

        return (
            <div>
                <NavBar />
                <Banner title="Denúncias" />
                <div className="row mt-4 mb-4">
                    <div style={{ marginBottom: "0px", marginTop: "0px", marginLeft: "auto", marginRight: "auto" }} className="col-lg-8">
                        <div class="section-top-border">
                            <h3 class="mb-30">Tabela de Denúncias</h3>
                            <div class="progress-table-wrap">
                                <div class="progress-table">
                                    <div class="table-head">
                                        <div class="serial">Posição</div>
                                        <div class="country">Item</div>
                                        <div class="visit">Denunciador</div>
                                        <div class="visit">Denunciado</div>
                                        <div class="visit">Visuaizar</div>
                                    </div>
                                    {!denunciations[0] && 
                                        <div class="table-row">
                                            <div class="serial">Nenhuma</div>
                                            <div class="country">Denúncia</div>
                                            <div class="visit"></div>
                                            <div class="visit"></div>
                                            <div class="visit"></div>
                                        </div>
                                    }
                                    {denunciations[0] && denunciations.map((complaint, index) => (
                                        <div class="table-row">
                                            <div class="serial">{index + 1}</div>
                                            <div class="country">{complaint.item}</div>
                                            <div class="visit">{complaint.denunciador}</div>
                                            <div class="visit">{complaint.denunciado}</div>
                                            <Link to={`/app/admin/denuncias/${complaint.id}`} class="genric-btn info circle arrow">Ver</Link>
                                        </div>
                                    ))}
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