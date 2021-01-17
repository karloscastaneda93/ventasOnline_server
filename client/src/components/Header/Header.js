import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Image } from 'react-bootstrap';
import { connect } from 'react-redux';

import * as actions from '../../actions';

import LogOutButton from '../LogOutButton/LogOutButton';

import "./Header.css";

import default_logo from "../../assets/default-profile.jpg";

function notJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

class Header extends Component {
    async signOut() {
        await this.props.signOut();
        await this.props.checkAuth();
    }

    signOutHandler() {
        this.signOut();
    }

    render() {
        const { isAuth, cookieUser, loggedInUser } = this.props;
        let userProfilePic = default_logo;
        if ((isAuth && Object.keys(cookieUser).length)) {
            const usr = notJson(cookieUser) ? JSON.parse(cookieUser) : cookieUser;
            if (usr.hasOwnProperty("picture")) userProfilePic = usr.picture.data.url
        }
        return (
            <Fragment>
                {isAuth ?
                    <Navbar bg="light" expand="lg" sticky="top">
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />=
                        <Navbar.Brand as={Link} to="/">
                            <Image src={userProfilePic} roundedCircle
                                with="36"
                                height="36"
                                className="d-inline-block align-top"
                                alt="home logo" />
                        </Navbar.Brand>
                        <Fragment>
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="mr-auto">
                                    <Nav.Link as={Link} to="/">Inicio</Nav.Link>
                                    <LogOutButton signOutCB={this.signOutHandler.bind(this)} />
                                </Nav>
                            </Navbar.Collapse>
                        </Fragment>
                    </Navbar>
                    :
                    null
                }
            </Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        isAuth: state.auth.isAuthenticated,
        cookieUser: state.auth.user,
        loggedInUser: state.dash.user
    };
}

export default connect(mapStateToProps, actions)(Header);