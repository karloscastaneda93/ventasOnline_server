import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Nav, Image, Col } from 'react-bootstrap';
import { connect } from 'react-redux';

import Header from "..//Header/Header";
import LogOutButton from '../LogOutButton/LogOutButton';

import * as actions from '../../actions';

import './Sidebar.css';

import default_logo from "../../assets/default-profile.jpg";

function notJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

class Sidebar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            leftOpen: false
        }
    }

    async signOut() {
        await this.props.signOut();
        await this.props.checkAuth();
    }

    signOutHandler() {
        this.signOut();
    }

    toggleSidebar = (event) => {
        let key = `${event.currentTarget.parentNode.id}Open`;
        this.setState({ [key]: !this.state[key] });
    }

    render() {
        const leftOpen = this.state.leftOpen ? 'open' : 'closed';

        let { isAuth, cookieUser } = this.props;

        if (cookieUser)
            cookieUser = notJson(cookieUser) ? JSON.parse(cookieUser) : cookieUser;

        const name = cookieUser ? cookieUser.name : "";

        let userProfilePic = default_logo;
        if ((isAuth && Object.keys(cookieUser).length)) {
            const usr = notJson(cookieUser) ? JSON.parse(cookieUser) : cookieUser;
            if (usr.hasOwnProperty("picture")) userProfilePic = usr.picture.data.url
        }

        return (
            <div id='layout'>
                {isAuth ?
                    <div id='left' className={leftOpen} >
                        <div className='icon' onClick={this.toggleSidebar} >
                            &equiv;
                    </div>
                        <div className={`sidebar ${leftOpen}`} >
                            <div className='content'>
                                <Col md={12} className="d-flex justify-content-center flex-column text-center  p-0">
                                    <div style={{ background: "#ddd" }} className="container my-4 d-flex justify-content-center">
                                        <div className="p-3">
                                            <div className="d-flex align-items-center">
                                                <div className="image">
                                                    <Image src={userProfilePic} roundedCircle
                                                        with="36"
                                                        style={{
                                                            maxWwidth: "36px",
                                                            maxHeight: "36px",
                                                            margin: "auto"
                                                        }}
                                                        alt="User Logo" />
                                                </div>

                                                <div className="ml-2 w-100">
                                                    <div style={{ fontSize: "14px" }} className="mb-0 mt-0 font-italic"><Link to="/">{name}</Link></div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <Nav.Link as={Link} to="/"><i className="fa fa-home mr-1"></i>Inicio</Nav.Link>
                                    <LogOutButton signOutCB={this.signOutHandler.bind(this)} />
                                </Col>
                            </div>
                        </div>
                    </div>
                    :
                    null
                }
                <div id='main'>
                    {isAuth ?
                        <div className='header'>
                            <div className={`container ${'left-' + leftOpen}`}>
                                <div className="search-bar">
                                        <div className="row">
                                            <div className="form-group">
                                                <input type="search" name="search" placeholder="Eg: #35453" />
                                            </div>
                                        </div>
                                </div>
                            </div>
                        </div>
                        :
                        null
                    }
                    <div className="content">
                        {this.props.children}
                    </div>
                </div>
            </div>
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

export default connect(mapStateToProps, actions)(Sidebar);