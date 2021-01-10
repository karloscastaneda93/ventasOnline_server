import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';

import * as actions from '../../actions';

import { Modal, Button } from 'react-bootstrap';

import CustomInput from '../CustomInput/CustomInput'

class SignUp extends Component {
	constructor(props) {
		super(props);
		this.onSubmit = this.onSubmit.bind(this);
		this.responseFacebook = this.responseFacebook.bind(this);
		this.state = {
			show: false
		};
		this.handleClose = this.handleClose.bind(this);
		this.handleShow = this.handleShow.bind(this);
		this.handleSignUp = this.handleSignUp.bind(this);
	}

	async onSubmit(formData) {
		// await this.props.signUp(formData);
		// if (!this.props.errorMessage) {
		// 	this.props.history.push('/');
		// }
		console.log(formData);
	}

	async responseFacebook(res) {
		await this.props.oauthFacebook(res);
		if (!this.props.errorMessage) {
			this.props.history.push('/');
		}
	}


	handleClose() {
		this.setState({ show: false });
	}

	handleShow() {
		this.setState({ show: true });
	}

	handleSignUp() {
		console.log('sign up');
	}

	render() {
		const { show } = this.state;
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
					<Modal.Body>
						<form onSubmit={this.onSubmit}>
							<div className="row">
								<div className="col-xs-12 col-sm-12 col-md-12">
									<fieldset>
										<Field
											name="nombre"
											type="text"
											id="nombre"
											label="Tu Nombre"
											placeholder="Nombre"
											className="form-control"
											component={CustomInput} />
									</fieldset>
								</div>
								<div className="col-xs-12 col-sm-12 col-md-12">
									<fieldset>
										<Field
											name="apellidos"
											type="text"
											id="apellidos"
											label="Tus Apellidos"
											placeholder="Apellidos"
											className="form-control"
											component={CustomInput} />
									</fieldset>
								</div>
								<div className="col-xs-6 col-sm-6 col-md-6">
									<fieldset>
										<Field
											name="email"
											type="text"
											id="email"
											label="Tu Email"
											placeholder="Email"
											className="form-control"
											component={CustomInput} />
									</fieldset>
								</div>
								<div className="col-xs-6 col-sm-6 col-md-6">
									<fieldset>
										<Field
											name="password"
											type="password"
											id="password"
											label="Tu Contraseña"
											placeholder="Contraseña"
											className="form-control"
											component={CustomInput} />
									</fieldset>
								</div>
							</div>

							{this.props.errorMessage ?
								<div className="alert alert-danger">
									{this.props.errorMessage}
								</div> : null}
						</form>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={this.handleClose}>
							cancelar
						</Button>
						<Button variant="success" onClick={this.handleSignUp}>
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
