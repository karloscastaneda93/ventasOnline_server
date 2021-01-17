import React, { Component, Fragment } from 'react';
import {withRouter} from 'react-router-dom';
import { Card, Image } from 'react-bootstrap';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

import * as actions from '../../actions';
import CustomInput from '../CustomInput/CustomInput';
import SignUp from '../SignUp/SignUp';

import default_logo from "../../assets/default-profile.jpg";

const SignUpWithHistory = withRouter(SignUp);

class SignIn extends Component {
	constructor(props) {
		super(props);
		this.onSubmit = this.onSubmit.bind(this);
		this.responseFacebook = this.responseFacebook.bind(this);
	}

	async onSubmit(formData) {
		await this.props.signIn(formData);
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

	render() {
		const { handleSubmit } = this.props;
		return (<Fragment>
			<div className="container">
				<div className="row d-flex justify-content-center my-5">
					<div className="col-xs-12">
						<Card style={{ minWidth: "30vw" }}>
							<Card.Body>
								<div className="col">
									<div style={{ position: "relative", height: "96px" }}>
										<Image src={default_logo} roundedCircle
											with="96"
											height="96"
											className="d-inline-block align-top"
											style={{
												position: 'absolute',
												left: '50%',
												transform: 'translateX(-50%)'
											}}
											alt="home logo" />
									</div>
									<div className="text-center">
										<div className="p-3 bg-gradient-dark text-dark my-3">
											Entra usando Facebook.
                      					</div>
										<FacebookLogin
											appId="776669173200188"
											render={renderProps => (
												<button style={{ marginRight: 15 }} className="col-12 btn btn-primary" onClick={renderProps.onClick}><i className="fab fa-facebook-f"></i>&nbsp;&nbsp;Entrar</button>
											)}
											fields="name,email,picture"
											callback={this.responseFacebook}
											cssClass="btn btn-block btn-outline-info"
										/>
									</div>
								</div>
								<br />
								<hr />
								<div className="col">
										<div className="text-center">
											Entra usando tu Email y Contraseña.
                      					</div>
									<form onSubmit={handleSubmit(this.onSubmit)}>
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

										{this.props.errorMessage ?
											<div className="alert alert-danger">
												{this.props.errorMessage}
											</div> : null}
										<div className="text-center">
											<button type="submit" className="col-12 btn btn-primary my-3">Entrar</button>
											<a className="col-12 text-xl-center hover" href="#">Olvide mi Contraseña</a>
										</div>
									</form>
								</div>
								<br />
								<hr />
								<br />
								<SignUpWithHistory/>
							</Card.Body>
						</Card>
					</div>
				</div>
			</div>
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
	reduxForm({ form: 'signin' })
)(SignIn)