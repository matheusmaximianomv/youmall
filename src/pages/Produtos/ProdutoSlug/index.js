import React, { Component } from 'react';

import { db } from './../../../config/database'; 
import { getToken } from './../../../services/auth';

export default class ProductSlug extends Component {
    state = {
        product : {},
        loading : true
    }

    async componentWillMount() {
        const { slug_product } = this.props.match.params;
        try {
            const product = await db.collection('products').doc(slug_product).get()
            if(product.exists) {
                const user = await product.data().responsavel.get();
                if(user.id !== getToken().uid) {
                    this.setState({product : product.data()});
                    this.setState({loading : false});
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
        return(
            <div>
                <h1>Produto - {this.state.product.name}</h1>
            </div>
        );
    }
}