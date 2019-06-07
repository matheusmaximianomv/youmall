import React, { Component } from 'react';

import { db } from './../../config/database';
import { getToken } from './../../services/auth';

export default class EditarProduto extends Component {

    state = {
        productId : null,
        productData : null,
        loading : true
    }

    async componentWillMount() {

        const { id } = this.props.match.params;
        try {
            const product = await db.collection('products').doc(id).get();
            if(product.exists) {
                this.setState({ productId : product.id, productData : product.data()});
            }
        } catch (error) {
            
        }

    }

    render() {
        return (
            <div>

            </div>
        );
    }
}