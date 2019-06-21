import React, {Component} from 'react';

import Banner from '../../components/Banner';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';

export default class SemPagina extends Component{
    render(){
        return(
            <div>
                <NavBar/>
                <Banner/>
                <div className="text-center mt-2">
                    <h2>Error: 404 Page not Found</h2>
                </div>
                <div className="text-center mt-4 mb-5">
                    <img src="https://pbs.twimg.com/profile_images/959092447702913024/dbs6fIJj.jpg" class="img-fluid" alt="Responsive image" />
                </div>
                <Footer/>
            </div>
        );
    }
}