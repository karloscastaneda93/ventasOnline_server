import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';
import store from "../../store";

export default (OriginalComponent) => {
	class MixedComponent extends Component {

		constructor(props) {
			super(props);
			store.subscribe(this.bindStore.bind(this));
		}

		bindStore() {
			const { auth } = store.getState();
			if (auth.isSignOut && !auth.isAuthenticated) this.props.history.push('/iniciar-sesion');
		}

		checkAuth() {
			if (!this.props.isAuth) {
				this.props.history.push('/iniciar-sesion');
			}else {
				if (this.props.location.pathname === '/iniciar-sesion') this.props.history.push('/');
			}
		}

		async componentWillMount() {
			await this.props.checkAuth();
			this.checkAuth();
		}

		render() {
			return <OriginalComponent {...this.props} />;
		}
	}

	function mapStateToProps(state) {
		return {
			isAuth: state.auth.isAuthenticated,
			isSignOut: state.auth.isSignOut
		}
	}

	return connect(mapStateToProps, actions)(MixedComponent);
};