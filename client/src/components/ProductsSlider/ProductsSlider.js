import React, { Component } from "react";
import { connect } from 'react-redux';
import { compose } from 'redux';

import * as actions from '../../actions';

import "./ProductsSlider.css";

class ProductsSlider extends Component {
    componentDidMount() {
        this.props.getProducts();
    }

    mapProducts({ title, price, _id, category, images }, index) {
        return (
            <div key={index} className="col-md-4">
                <div className="product-card">
                    <div className="badge">Hot</div>
                    <div className="product-tumb">
                        <img src={images[0]} alt="" />
                    </div>
                    <div className="product-details">
                        <span className="product-catagory">{category}</span>
                        <h4><a href={`/product/${_id}`}>{title}</a></h4>
                        <p>descripcion</p>
                        <div className="product-bottom-details">
                            <div className="product-price"><small>{price}</small>{price}</div>
                            <div className="product-links">
                                <span><i className="fa fa-heart"></i></span>
                                <span><i className="fa fa-shopping-cart"></i></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    render() {
        const { productsGetData: { products } } = this.props;

        return (
            <div className="container">
                <h2 className="our-product">Products Nuevos</h2>
                <div className="row">
                    {(products && products.length) ? products.map(this.mapProducts.bind(this)) : null}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        productsGetData: state.prods.productsGetData
    }
}

export default compose(
    connect(mapStateToProps, actions)
)(ProductsSlider)