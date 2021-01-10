import {
	AUTH_SIGN_UP,
	AUTH_SIGN_OUT,
	AUTH_SIGN_IN,
	AUTH_ERROR,
	AUTH_SESSION
} from '../actions/types';

const DEFAULT_STATE = {
	isAuthenticated: false,
	errorMessage: '',
	user: localStorage.getItem("user") || {},
	isSignOut: false
}

export default (state = DEFAULT_STATE, action) => {
	switch (action.type) {
		case AUTH_SIGN_UP:
			return { ...state, isAuthenticated: true, user: action.payload, errorMessage: '' }
		case AUTH_SIGN_IN:
			return { ...state, isAuthenticated: true, user: action.payload, errorMessage: '' }
		case AUTH_SESSION:
			return { ...state, isAuthenticated: true }
		case AUTH_SIGN_OUT:
			return { ...state, isAuthenticated: false, errorMessage: '', isSignOut:true }
		case AUTH_ERROR:
			return { ...state, errorMessage: action.payload }
		default:
			return state
	}
}