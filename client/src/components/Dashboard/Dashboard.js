import React, { Component } from "react";
import SwipeableViews from 'react-swipeable-views';
import { Nav } from 'react-bootstrap';

import TopBanner from '../TopBanner/TopBanner';
import Products from '../Products/Products';
import Orders from '../Orders/Orders';
import Clients from '../Clients/Clients';
import Categories from "../Categories/Categories";

import "./Dashboard.css";

import * as actions from '../../actions';

import { connect } from 'react-redux';
import { compose } from 'redux';

function notJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

class Dashboard extends Component {
    state = {
        index: 0
    };

    componentDidMount() {
        this.props.getAllCategories();
    }

    handleChange = (event, value) => {
        this.setState({
            index: value,
        });
    };

    handleChangeIndex = index => {
        this.setState({
            index,
        });
    };

    setTab(e) {
        this.setState({
            index: parseInt(e),
        });
    }

    render() {
        const { index } = this.state;
        const { auth: { user } } = this.props;
        const name = user ? (notJson(user) ? JSON.parse(user).name : user.name) : "";

        return (
            <div className="dashboard">
                <header className="main-header">
                    <TopBanner text={`Hola ${name}`} />
                    <Nav fill variant="tabs" defaultActiveKey="0" activeKey={index} onSelect={this.setTab.bind(this)}>
                        <Nav.Item>
                            <Nav.Link eventKey="0"><i className="fas fa-file-alt mr-2"></i>Ordenes</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="1"><i className="fas fa-tags mr-2"></i>Productos</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="2"><i className="fas fa-users mr-2"></i>Clientes</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="3"><i className="fas fa-th mr-2"></i>Categorias</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </header>
                <br />
                <div className="container app">
                    <div className="row">
                        <div className="col">
                            <SwipeableViews className="test" enableMouseEvents index={index} onChangeIndex={this.handleChangeIndex}>
                                <Orders />
                                <Products />
                                <Clients />
                                <Categories />
                            </SwipeableViews>
                        </div>
                    </div>
                </div>
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
)(Dashboard)