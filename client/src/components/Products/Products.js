import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Table, Button, Col, Image, Pagination } from 'react-bootstrap';

import * as actions from '../../actions';

import "./Products.css";

class Products extends Component {
    componentDidMount() {
        this.props.getProducts();
    }

    mapProducts({ title, price, _id, tags, images, stock }, index) {
        return (
            <tr key={index}>
                <td>
                    <Col md={12}>
                        <Image style={{ width: "64px", height: "64px", objectFit: "cover" }}
                            className="mr-3"
                            src={images[0]}
                            roundedCircle
                        />
                        {title}
                    </Col>
                </td>
                <td>${price}</td>
                <td>{(tags && tags.length) ? tags.map(tag => { return tag }) : null}</td>
                <td>{stock}</td>
                <td>
                    <Link className="btn btn-outline-secondary" to={`/product/${_id}`}>Editar!</Link>
                </td>
            </tr>
        );
    }
    render() {
        const { productsGetData: { products } } = this.props;
        let active = 1;
        let items = [];
        if (products && products.total_pages)
            for (let number = 1; number <= products.total_pages; number++) {
                items.push(
                    <Pagination.Item key={number} active={number === active}>
                        {number}
                    </Pagination.Item>,
                );
            }
        return (
            <div className="swiper-container">
                <Col md={12} className={"d-flex my-5 justify-content-between align-items-center"} style={{height:"65px"}}>
                    <h2 className="col our-product">Productos ({(products && products.results.length) && products.total_items})</h2>
                    <Link className="btn btn-success my-auto" to="/product/upload"> Nuevo Producto! </Link>
                </Col>
                <Col className="table-responsive">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Precio</th>
                                <th>Tags</th>
                                <th>Cantidad en Stock</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {(products && products.results.length) ? products.results.map(this.mapProducts) : null}
                        </tbody>
                    </Table>
                </Col>
                <Col md={12} className={"d-flex my-5 justify-content-between align-items-center"}>
                    <Pagination className={"my-auto"}>
                        <Pagination.First />
                        <Pagination.Prev />
                        {items}
                        <Pagination.Next />
                        <Pagination.Last />
                    </Pagination>
                </Col>
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
)(Products)