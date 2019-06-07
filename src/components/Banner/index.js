import React, {Component} from "react";

export default class Banner extends Component{
    render(){
        return (
        <section className="banner-area organic-breadcrumb">
		<div className="container">
			<div className="breadcrumb-banner d-flex flex-wrap align-items-center justify-content-end">
				<div className="col-first">
					<h1>{this.props.title}</h1>
				</div>
			</div>
		</div>
	</section>
        );
    };
}