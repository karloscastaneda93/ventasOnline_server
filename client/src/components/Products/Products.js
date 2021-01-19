import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Table, Button, Col, Image } from 'react-bootstrap';

import * as actions from '../../actions';

import "./Products.css";

class Products extends Component {
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
            <div className="swiper-container">
                <h2 className="col our-product">Productos (3)</h2>
                <div className="col">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Precio</th>
                                <th>Id</th>
                                <th>Cantidad en Stock</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <Col md={12}>
                                        <Image className="mr-3" src="https://via.placeholder.com/64" roundedCircle  />
                                        Camisa Adidas
                                    </Col>
                                </td>
                                <td>$123</td>  
                                <td>A234525</td>
                                <td>3</td>
                                <td>
                                    <Button variant="outline-secondary" className="btn">
                                        Editar
                                    </Button>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Col md={12}>
                                        <Image className="mr-3" src="https://via.placeholder.com/64" roundedCircle  />
                                        Pantalon mamalon
                                    </Col>
                                </td>
                                <td>$123</td> 
                                <td>A234525</td>
                                <td>99</td>
                                <td>
                                    <Button variant="outline-secondary" className="btn">
                                        Editar
                                    </Button>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Col md={12}>
                                        <Image className="mr-3" src="https://via.placeholder.com/64" roundedCircle  />
                                        Calcetines culerones
                                    </Col>
                                </td>
                                <td>$123</td> 
                                <td>A234525</td>
                                <td>4</td>
                                <td>
                                    <Button variant="outline-secondary" className="btn">
                                        Editar
                                    </Button>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                    <Button variant="success" className="btn my-5" href="/products/upload">
						Nuevo Producto!
				  	</Button>
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
)(Products)