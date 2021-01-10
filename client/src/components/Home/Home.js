import React, { Component } from "react";

import TopBanner from '../TopBanner/TopBanner';
import ProductsSlider from '../ProductsSlider/ProductsSlider';

import "./Home.css";

import * as actions from '../../actions';

import { connect } from 'react-redux';
import { compose } from 'redux';

class Home extends Component {
    async componentDidMount() {
        const { match: { params: { id } } } = this.props;
        await this.props.getSingleProduct(id);
        await this.props.getDashboard();
    }

    render() {
        const {user} = this.props;
        return (
            <div className="home">
                <header className="main-header">
                    <TopBanner text={'Bienvenido'} />
                </header>
                <hr />
                <section className="products-slider">
                    <ProductsSlider />
                </section>

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.dash.user,
        auth: state.auth
    }
}

export default compose(
    connect(mapStateToProps, actions)
)(Home)