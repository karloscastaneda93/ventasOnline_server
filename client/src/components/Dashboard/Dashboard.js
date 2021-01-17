import React, { Component } from "react";
import SwipeableViews from 'react-swipeable-views';
import { Tabs, Tab } from 'react-bootstrap';

import TopBanner from '../TopBanner/TopBanner';
import ProductsSlider from '../ProductsSlider/ProductsSlider';
import Orders from '../Orders/Orders';

import "./Dashboard.css";

import * as actions from '../../actions';

import { connect } from 'react-redux';
import { compose } from 'redux';

class Dashboard extends Component {
    state = {
        index: 0
    };

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
            <div className="home">
                <header className="main-header">
                    <TopBanner text={'Bienvenido'} />
                    <Tabs defaultActiveKey="0" activeKey={index} variant="tabs" onSelect={this.setTab.bind(this)}>
                        <Tab eventKey="0" title="Ordenes"/>
                        <Tab eventKey="1" title="Productos"/>
                    </Tabs>
                </header>
                <br />
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <SwipeableViews enableMouseEvents index={index} onChangeIndex={this.handleChangeIndex}>
                                <Orders />
                                <ProductsSlider />
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