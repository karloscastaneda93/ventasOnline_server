import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Container, Row, Col } from 'react-bootstrap';

import * as actions from '../../actions';

import "./ProductPage.css";

import TopBanner from '../TopBanner/TopBanner';

const isEmpty = (obj) => {
    for (let key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

class ProductPage extends Component {
    componentDidMount() {
        const { match: { params: { id } } } = this.props;
        this.props.getSingleProduct(id);
    }

    render() {
        const { SingleProductGetData: product, errorMessage } = this.props;
        return (
            <Fragment>
                <header className="main-header">
                    <TopBanner text={'Producto'} />
                </header>
                <div className="container">
                    <div className="row">
                        {!isEmpty(product) ?
                            <div className="col-md-8">
                                <div className="product-card">
                                    <div className="product-tumb">
                                        {/* {<img src={product.images[0]} alt="" />} */}
                                    </div>
                                    <div className="product-details">
                                        <span className="product-catagory">{product.category}</span>
                                        <h4>{product.title}</h4>
                                        <p>descripcion</p>
                                        {(product.tags && product.tags.length) ?
                                            <ul className="tags">{
                                                product.tags.map((tag, key) => {
                                                    return (
                                                        <li key={key}><span className="tag">{tag}</span></li>
                                                    );
                                                })
                                            }</ul>
                                            :
                                            null
                                        }
                                        <div className="product-bottom-details">
                                            <div className="product-price"><small>{product.price}</small>{product.price}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            : null
                        }
                        {errorMessage &&
                            <Col md={12}>
                                <h1>{errorMessage}</h1>
                            </Col>
                        }
                    </div>
                </div>
            </Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        SingleProductGetData: state.prods.SingleProductGetData,
        errorMessage: state.prods.errorMessage
    }
}

export default compose(
    connect(mapStateToProps, actions)
)(ProductPage)