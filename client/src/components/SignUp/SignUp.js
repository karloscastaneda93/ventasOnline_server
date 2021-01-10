import React, { Component, Fragment, useState } from "react";
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';

import * as actions from '../../actions';

import { Modal, Button, Nav } from 'react-bootstrap';

class SignUp extends Component {
	constructor(props) {
		super(props);
		this.onSubmit = this.onSubmit.bind(this);
		this.responseFacebook = this.responseFacebook.bind(this);
		this.state = {
			show:false
		};
		this.handleClose = this.handleClose.bind(this);
		this.handleShow = this.handleShow.bind(this);
		this.handleSignUp = this.handleSignUp.bind(this);
	}

	async onSubmit(formData) {
		await this.props.signUp(formData);
		if (!this.props.errorMessage) {
			this.props.history.push('/');
		}
	}

	async responseFacebook(res) {
		await this.props.oauthFacebook(res);
		if (!this.props.errorMessage) {
			this.props.history.push('/');
		}
	}

	
	handleClose(){
		this.setState({show:false});
	}

	handleShow(){
		this.setState({show:true});
	}
	
	handleSignUp(){
		console.log('sign up');
	}

	render() {
		const {show} = this.state;
		return (
			<Fragment>
				<div className="col-12">
					<Button onClick={this.handleShow} variant="success" className="btn btn-block">
						Registrate!
				  </Button>
				</div>
				<Modal show={show} onHide={this.handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>Registrate!</Modal.Title>
					</Modal.Header>
					<Modal.Body>formulario</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={this.handleClose}>
							cancelar
						</Button>
						<Button variant="primary" onClick={this.handleSignUp}>
							crear!
						</Button>
					</Modal.Footer>
				</Modal>
			</Fragment>
		);
	}
}

function mapStateToProps(state) {
	return {
		errorMessage: state.auth.errorMessage
	}
}

export default compose(
	connect(mapStateToProps, actions),
	reduxForm({ form: 'signup' })
)(SignUp)
