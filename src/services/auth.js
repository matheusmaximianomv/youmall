import { auth, db } from './../config/database';

import { cancelPurchase } from './cart';

export const TOKEN_KEY = "@youmall";

export const isAuthenticated = () =>  {
    if(!localStorage.getItem(TOKEN_KEY))
        return false;
    try {
        if (JSON.parse(window.atob(localStorage.getItem(TOKEN_KEY))))
            return true;
        return false;
    } catch (error) {
        return false;
    }
}

export const getToken = () => {
    try {
        return JSON.parse(window.atob(localStorage.getItem(TOKEN_KEY)));
    } catch (error) {
        logout();
        return null;
    }

}

export const login = async (params) => {
    const user_db = await db.collection('users').doc(params.user.uid).get();
    const user = { uid: params.user.uid, email: params.user.email, database : user_db.data() }
    localStorage.setItem(TOKEN_KEY, window.btoa(JSON.stringify(user)));
}

export const logout = () => {
    auth.signOut();
    cancelPurchase();
    localStorage.removeItem(TOKEN_KEY);
}