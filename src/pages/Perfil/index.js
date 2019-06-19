import React, { Component } from 'react';

import { db } from './../../config/database';
import { getToken } from './../../services/auth';

export default class Perfil extends Component {

    state = {
        loading: true,
        userInfo: {}
    }

    async componentDidMount() {
        try {
            const user = await db.collection('users').doc(getToken().uid).get();
            const userInfo = {
                id : user.id,
                info : user.data()
            }
            this.setState({ userInfo, loading: false});
        } catch (error) {
            window.location.assign('/app');
        }
    }

    render(){
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
        console.log(this.state.userInfo);
        return(
            <div>
                <h1>Perfil do Usuário</h1>
            </div>
        );
    }
}