import React, { Component } from "react";
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Table, Button } from 'react-bootstrap';

import * as actions from '../../actions';

import "./Clients.css";

class Clients extends Component {
    render() {
        return (
            <div className="swiper-container">
                <h2 className="col our-product">Clientes</h2>
                <div className="col">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Nombre</th>
                                <th>FB Link</th>
                                <th># Recolector</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>134</td>
                                <td>Mark suckerbergas</td>
                                <td>fb.com</td>
                                <td>43</td>
                            </tr>
                            <tr>
                                <td>225</td>
                                <td>Jacobo saludovsky</td>
                                <td>tumama.com</td>
                                <td>1</td>
                            </tr>
                            <tr>
                                <td>3745</td>
                                <td>Larry cañonga</td>
                                <td>tumama.com</td>
                                <td>32</td>
                            </tr>
                        </tbody>
                    </Table>
                    <Button variant="success" className="btn my-5">
						Nuevo Cliente!
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
)(Clients)