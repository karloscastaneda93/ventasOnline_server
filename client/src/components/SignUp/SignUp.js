import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { Formik, Form } from "formik";
import * as Yup from "yup";

import * as actions from '../../actions';

import { Modal, Button, Alert } from 'react-bootstrap';

import CustomInput from '../CustomInput/CustomInput';

const UserSchema = Yup.object().shape({
	email: Yup.string().required("Debes Poner Algun Email"),
	name: Yup.string().required("Debes Poner Algun Nombre"),
	facebook: Yup.string().required("Debes Poner Algun Facebook"),
	password: Yup
		.string()
		.required('Debes Poner Alguna Contraseña')
		.matches(
			/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
			"La contraseña debe tener al menos 8 letras: una Mayuscula, una minuscula, un numero y un caracter especial"
		)
});

class SignUp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			show: false
		};
		this.onSubmit = this.onSubmit.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleShow = this.handleShow.bind(this);
	}

	async onSubmit(formData) {
		await this.props.signUp(formData);
		if (!this.props.errorMessage) {
			this.props.history.push('/');
			this.handleClose();
		}
	}

	handleClose() {
		this.setState({ show: false });
	}

	handleShow() {
		this.setState({ show: true });
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
						<Formik
							initialValues={{
								name: "",
								password: "",
								facebook: "",
								email: ""
							}}
							onSubmit={this.onSubmit}
							validationSchema={UserSchema}
						>
							{props => {
								const {
									values,
									errors,
									touched,
									handleChange,
									handleBlur,
									handleSubmit
								} = props;

								return (
									<Form onSubmit={handleSubmit}>
										<div className="row">
											<div className="col-xs-12 col-sm-12 col-md-12">
												<fieldset>
													<Field
														name="name"
														type="text"
														id="name"
														label="Tu Nombre"
														placeholder="Tu Nombre"
														className="form-control"
														onChange={handleChange}
														value={values.name}
														onBlur={handleBlur}
														component={CustomInput} />
												</fieldset>
												{(touched.name && (errors.name && errors.name.length)) &&
													<Alert variant="danger" className="btn-block text-left">
														{errors.name}
													</Alert>
												}
											</div>
											<div className="col-xs-12 col-sm-12 col-md-12">
												<fieldset>
													<Field
														name="email"
														type="text"
														id="email"
														label="Tu Email"
														placeholder="Tu Email"
														className="form-control"
														onChange={handleChange}
														value={values.name}
														onBlur={handleBlur}
														component={CustomInput} />
												</fieldset>
												{(touched.email && (errors.email && errors.email.length)) &&
													<Alert variant="danger" className="btn-block text-left">
														{errors.email}
													</Alert>
												}
											</div>
											<div className="col-xs-12 col-sm-12 col-md-12">
												<fieldset>
													<Field
														name="password"
														type="password"
														id="password"
														label="Tu Contraseña"
														placeholder="Tu Contraseña"
														className="form-control"
														onChange={handleChange}
														value={values.name}
														onBlur={handleBlur}
														component={CustomInput} />
												</fieldset>
												{(touched.password && (errors.password && errors.password.length)) &&
													<Alert variant="danger" className="btn-block text-left">
														{errors.password}
													</Alert>
												}
											</div>
											<div className="col-xs-12 col-sm-12 col-md-12">
												<fieldset>
													<Field
														name="facebook"
														type="text"
														id="facebook"
														label="Tu Facebook"
														placeholder="Tu Facebook"
														className="form-control"
														onChange={handleChange}
														value={values.name}
														onBlur={handleBlur}
														component={CustomInput} />
												</fieldset>
												{(touched.facebook && (errors.facebook && errors.facebook.length)) &&
													<Alert variant="danger" className="btn-block text-left">
														{errors.facebook}
													</Alert>
												}
											</div>
											<div className="col-xs-12 col-sm-12 col-md-12 d-flex justify-content-end"
												style={{ borderTop: "1px solid #dee2e6", paddingTop: "1rem" }}>
												<Button variant="secondary" onClick={this.handleClose}>
													cancelar
													</Button>
												<Button variant="success" type="submit" onClick={handleSubmit} className="ml-5">
													crear!
													</Button>
											</div>
										</div>
									</Form>
								);
							}}
						</Formik>
					</Modal.Body>
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
