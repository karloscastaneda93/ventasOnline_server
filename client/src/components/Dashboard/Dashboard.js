import React, { Component } from "react";
import SwipeableViews from 'react-swipeable-views';
import { Tabs, Tab } from 'react-bootstrap';

import TopBanner from '../TopBanner/TopBanner';
import Products from '../Products/Products';
import Orders from '../Orders/Orders';
import Clients from '../Clients/Clients';
import Categories from "../Categories/Categories";

import "./Dashboard.css";

import * as actions from '../../actions';

import { connect } from 'react-redux';
import { compose } from 'redux';

class Dashboard extends Component {
    state = {
        index: 0
    };

    componentDidMount(){
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

    setTab(e){
        this.setState({
            index:parseInt(e),
        });
    }

    render() {
        const { index } = this.state;
        return (
            <div className="dashboard">
                <header className="main-header">
                    <TopBanner text={'Bienvenido'} />
                    <Tabs className="d-flex justify-content-center" defaultActiveKey="0" activeKey={index} variant="tabs" onSelect={this.setTab.bind(this)}>
                        <Tab eventKey="0" title="Ordenes"/>
                        <Tab eventKey="1" title="Productos"/>
                        <Tab eventKey="2" title="Clientes"/>
                        <Tab eventKey="3" title="Categorias"/>
                    </Tabs>
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