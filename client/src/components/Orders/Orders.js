import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Table, Button } from 'react-bootstrap';

import * as actions from '../../actions';

class Orders extends Component {
    render() {
        return (
            <Fragment>
                <h2 className="our-product">Ordenes</h2>
                <div className="col">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Cliente</th>
                                <th>Total</th>
                                <th>Estatus</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Mark</td>
                                <td>$$$</td>
                                <td>Activa</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Jacob</td>
                                <td>$$$</td>
                                <td>Activa</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>Larry</td>
                                <td>$$$</td>
                                <td>Activa</td>
                            </tr>
                        </tbody>
                    </Table>
                    <Button variant="success" className="btn my-5">
						Nueva Orden!
				  	</Button>
                </div>
            </Fragment>
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
)(Orders)