import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import {Navbar, Nav, Image} from 'react-bootstrap';
import { connect } from 'react-redux';

import * as actions from '../../actions';

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

    render() {
        const { isAuth, user  } = this.props;
        let userProfilePic = default_logo;
        if  ((isAuth && Object.keys(user).length)){
            let usr = user;
            if(notJson(usr)) usr = JSON.parse(user);
            if(usr.hasOwnProperty("picture")) userProfilePic = usr.picture.data.url
        }
        return (
            <Navbar bg="light" expand="lg" sticky="top">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />=
                <Navbar.Brand as={Link} to="/">
                    <Image src={userProfilePic} roundedCircle
                        with="36"
                        height="36"
                        className="d-inline-block align-top"
                        alt="home logo" />
                </Navbar.Brand>
                {isAuth  ? 
                        <Fragment>
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="mr-auto">
                                    <Nav.Link as={Link} to="/">Inicio</Nav.Link>
                                    <Nav.Link href="#" onClick={this.signOut.bind(this)}>Cerrar Sesión</Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                        </Fragment>
                        :
                        <Fragment>
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                                <Nav.Link as={Link} to="/iniciar-sesion">Iniciar sesión</Nav.Link>
                                <Nav.Link as={Link} to="/registro">Registrarte</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Fragment>
                }
            </Navbar>
        );
    }
}

function mapStateToProps(state) {
    return {
      isAuth: state.auth.isAuthenticated,
      user: state.auth.user
    };
  }
  
  export default connect(mapStateToProps, actions)(Header);