import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';

import { db } from './../../../config/database';

import NavBar from './../../../components/NavBar';
import Banner from './../../../components/Banner';
import Footer from './../../../components/Footer';

export default class Denuncias extends Component {

    state = {
        loading: true,
        proccess : false,
        complaint: {},
        itemDelete: false,
        item: {},
        denunciador: {},
        denunciado: {},
        denunciadoId : '',
        show: false,
        showModal : false,
        mensagem : '',
        showError : false,
        erro: {
            description: '',
            animation: ''
        },
        showSuccess : false,
        success: {
            description: '',
            animation: ''
        },
    }

    async componentWillMount() {
        const { id } = this.props.match.params;
        try {
            const denuncia = await db.collection('denunciations').doc(id).get();
            if (denuncia.exists) {
                const item = await denuncia.data().item.get();
                if (!item.exists) {
                    this.setState({ itemDelete: true });
                    return;
                }
                const denunciador = await denuncia.data().rementente.get();
                const denunciado = await denuncia.data().destinatario.get();
                this.setState({ complaint: { id: denuncia.id, data: denuncia.data() } });
                this.setState({ item: { id: item.id, data: item.data() } });
                this.setState({ denunciador: { id: denunciador.id, data: denunciador.data() } });
                this.setState({ denunciado: { id: denunciado.id, data: denunciado.data() } });
                this.setState({ loading: false });
            } else {
                window.location.assign("/app/admin/denuncias")
            }
        } catch (error) {
            window.location.assign("/app/admin/denuncias")
        }
    }

    handleClose = () => {
        this.setState({ show: false, showModal : false });
    }

    handleShow = (id) => {
        console.log(id);
        this.setState({ show: true, denunciadoId : id });
    }

    handleShowModal = () => {
        this.setState({ showModal: true });
    }

    excluirDenuncia = async () => {
        this.setState({proccess : true});
        try {
            await db.collection('denunciations').doc(this.state.complaint.id).delete();
            this.setState({showSuccess : true, show: false, showModal : false, success : { description : 'Denúncia Excluida Com Sucesso.', animation : 'animated bounceIn'}});
            setTimeout(() => {this.setState({showSuccess : false});}, 3000);
            setTimeout(() => {window.location.assign('/app/admin/denuncias');}, 3500);
        } catch(err) {
            this.setState({showError : true, show: false, showModal : false, erro : { description : 'Não foi possível remover essa denúncia, tente mais tarde', animation : 'animated bounceIn'}});
            setTimeout(() => {this.setState({showError : false});}, 3000);
            setTimeout(() => {this.setState({proccess : false});}, 3500);
        }
    }

    confimarDenuncia = async () => {
        this.setState({proccess : true});
        try {
            await db.collection('messages').doc(this.state.denunciado.id).set({
                mensagem : this.state.mensagem,
                imgUrl : this.state.item.data.imgUrl,
                nameProduct : this.state.item.data.name,
                descricaoProduct : this.state.item.data.descricao,
                precoProduct : this.state.item.data.preco,
                quantityProduct : this.state.item.data.quantidade
            });
            await db.collection('products').doc(this.state.item.id).delete();
            await db.collection('denunciations').doc(this.state.complaint.id).delete();
            this.setState({showSuccess : true, show: false, showModal : false, success : { description : 'Mensagem Enviada Com Sucesso.', animation : 'animated bounceIn'}});
            setTimeout(() => {this.setState({showSuccess : false});}, 3000);
            setTimeout(() => {window.location.assign('/app/admin/denuncias');}, 3500);
        } catch (err) {
            this.setState({showError : true, show: false, showModal : false, erro : { description : 'Não foi possível confirmar a denúncia, tente mais tarde', animation : 'animated bounceIn'}});
            setTimeout(() => {this.setState({showError : false});}, 3000);
            setTimeout(() => {this.setState({proccess : false});}, 3500);
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

        const { complaint, item, denunciado } = this.state;

        if (this.state.itemDelete) {
            return (
                <div>
                    <NavBar />
                    <Banner title="Item Deletado" />
                    <div className="container mt-5 mb-4">
                        <div className="row">
                            <div className="col-md-3"></div>
                            <div className="col-md-7">
                                <h1>O item já foi deletado ou vendido</h1>
                            </div>
                        </div>
                        <div className="row mt-5">
                            <div className="col-md-5"></div>
                            <div className="col-md-4">
                                <button type="button" onClick={() => { }} className="primary-btn">Deletar Denúncia</button>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            );
        } else {
            return (
                <div>
                    {/* Modal de Confirmação da Denúncia */}
                    <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={this.state.show} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Mensagem</Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ textAlign: 'justify' }}>Aqui você poderá mandar uma mensagem para o usuário que publicou, notificando que seu produto foi retirado da plataforma, e por fim, remover o item da plataforma.</Modal.Body>
                        <Modal.Body>
                            <form>
                                <div className="form-group">
                                    <label htmlFor="mensagem" className="col-form-label">Mensagem</label>
                                    <textarea className="form-control" onChange={event => this.setState({ mensagem: event.target.value })} id="mensagem" required></textarea>
                                </div>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <button type="button" className="btn btn-danger" onClick={this.handleClose}>
                                Cancelar
                        </button>
                            <button type="submit" onClick={this.confimarDenuncia} className="btn btn-primary">
                                Enviar e Deletar
                        </button>
                        </Modal.Footer>
                    </Modal>
                    {/* Modal de Denúncia Falsa */}
                    <Modal show={this.state.showModal} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Atenção</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Você realmente deseja excluir essa denúncia.</Modal.Body>
                        <Modal.Footer>
                            <button className="btn btn-primary" onClick={this.handleClose}>
                                Fechar
                            </button>
                            <button className="btn btn-danger" onClick={this.excluirDenuncia}>
                                Remover
                            </button>
                        </Modal.Footer>
                        </Modal>
                    <NavBar />
                    <Banner title={item.data.name} />
                    <section className="cart_area mb-0">
                        <div className="container mb-0">
                        {this.state.showError && <div id="erro" className={`alert alert-danger mt-2 mb-2 ${this.state.erro.animation}`} role="alert"> {this.state.erro.description}</div>}
                        {this.state.showSuccess && <div id="erro" className={`alert alert-success mt-2 mb-2 ${this.state.success.animation}`} role="alert"> {this.state.success.description}</div>}
                            <div className="cart_inner">
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">Produto / Descrição</th>
                                                <th scope="col">Preço</th>
                                                <th scope="col">Responsável</th>
                                                <th scope="col">Quantidade</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <div className="media">
                                                        <div className="d-flex">
                                                            <img width="150px" height="100px" src={item.data.imgUrl} alt="" />
                                                        </div>
                                                        <div className="media-body">
                                                            <p>{item.data.descricao}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <h5>${parseFloat(item.data.preco)}</h5>
                                                </td>
                                                <td>
                                                    <h5>{denunciado.data.name}</h5>
                                                </td>
                                                <td>
                                                    <h5 className="ml-4">{item.data.quantidade}</h5>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </section>
                    <div className="mb-5 container">
                        <div class="typography">
                            <h4>Mensagem da Denúncia</h4>
                        </div>
                        <div className="row mt-2">
                            <div className="col-lg-12">
                                <div class="quotes">{complaint.data.mensagem}</div>
                            </div>
                        </div>
                        <div className="row mt-5">
                            {this.state.proccess && 
                                <div className="offset-lg-6">
                                    <div className="spinner-border text-primary" role="status"><span className="sr-only">Loading...</span></div>
                                </div>
                            }
                            {!this.state.proccess && 
                                <div className="offset-lg-5 row" >
                                    <div className="col-md-4">
                                        <button onClick={this.handleShowModal} className="genric-btn info circle">Excluir</button>
                                    </div>
                                    <div className="col-md-7">
                                        <button onClick={() => this.handleShow(denunciado.id)} className="genric-btn primary circle">Deletar Produto</button>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                    <Footer />
                </div>
            );
        }
    }
}