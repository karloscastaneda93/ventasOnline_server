import axios from 'axios';
import Cookies from 'js-cookie';

import {
	PRODUCT_UPLOAD_SUCCESS,
	PRODUCT_UPLOAD_ERROR,
	PRODUCTS_GET_SUCCESS,
	PRODUCTS_GET_ERROR,
	PRODUCT_GET_SUCCESS,
	PRODUCT_GET_ERROR,
	AUTH_SIGN_UP,
	AUTH_SIGN_OUT,
	AUTH_SIGN_IN,
	AUTH_SESSION,
	AUTH_LINK_FACEBOOK,
	AUTH_UNLINK_FACEBOOK,
	AUTH_ERROR,
	DASHBOARD_GET_DATA
} from './types';

const api_base_url = 'http://localhost:5000/api';

export const uploadProduct = data => {
	return async dispatch => {
		try {
			await axios.post(`${api_base_url}/products/upload`, data);
			dispatch({
				type: PRODUCT_UPLOAD_SUCCESS,
				payload: 'success'
			});
		} catch ({ response: { data } }) {
			dispatch({
				type: PRODUCT_UPLOAD_ERROR,
				payload: data
			});
		}
	};
}

export const getProducts = () => {
	return async dispatch => {
		try {
			const { data: products } = await axios.get(`${api_base_url}/products`);
			dispatch({
				type: PRODUCTS_GET_SUCCESS,
				payload: products
			});
		} catch (err) {
			dispatch({
				type: PRODUCTS_GET_ERROR,
				payload: `Error Llamando Productos`
			});
		}
	};
}

export const getSingleProduct = id => {
	return async dispatch => {
		try {
			if (!id) return;
			const { data } = await axios.get(`${api_base_url}/products/${id}`);
			dispatch({
				type: PRODUCT_GET_SUCCESS,
				payload: data
			});
		} catch (err) {
			dispatch({
				type: PRODUCT_GET_ERROR,
				payload: `Producto No Encontrado`
			});
		}
	};
}

export const linkFacebook = data => {
	return async dispatch => {
		const res = await axios.post(`${api_base_url}/users/oauth/link/facebook`, {
			access_token: data
		});

		dispatch({
			type: AUTH_LINK_FACEBOOK,
			payload: res.data
		});
	};
}

export const unlinkFacebook = data => {
	return async dispatch => {
		const res = await axios.post(`${api_base_url}/users/oauth/unlink/facebook`);

		dispatch({
			type: AUTH_UNLINK_FACEBOOK,
			payload: res.data
		});
	};
}

export const oauthFacebook = data => {
	return async dispatch => {
		await axios.post(`${api_base_url}/users/oauth/facebook`, {
			access_token: data.accessToken
		});

		localStorage.setItem("user", JSON.stringify(data));

		dispatch({
			type: AUTH_SIGN_UP,
			payload: data
		});
	};
}

export const signUp = data => {
	return async dispatch => {
		try {
			await axios.post(`${api_base_url}/users/signup`, data);

			localStorage.setItem("user", JSON.stringify(data));

			dispatch({
				type: AUTH_SIGN_UP,
				payload: data
			});
		} catch (err) {
			dispatch({
				type: AUTH_ERROR,
				payload: err
			})
		}
	};
}

export const signIn = data => {
	return async dispatch => {
		try {
			await axios.post(`${api_base_url}/users/signin`, data);

			localStorage.setItem("user", JSON.stringify(data));

			dispatch({
				type: AUTH_SIGN_IN,
				payload: data
			});
		} catch (err) {
			dispatch({
				type: AUTH_ERROR,
				payload: 'El Email o Contraseña no son validos'
			})
		}
	};
}

export const checkAuth = () => {
	return async dispatch => {
		try {
			await axios.get(`${api_base_url}/users/status`, {
				headers: {
					'Authorization': Cookies.get('access_token')
				}
			});
			dispatch({
				type: AUTH_SESSION
			});
		} catch (err) {
			console.info("Unauthorized!")
		}
	};
}

export const getDashboard = () => {
	return async dispatch => {
		try {
			const res = await axios.get(`${api_base_url}/users/dashboard`)
			dispatch({
				type: DASHBOARD_GET_DATA,
				payload: res.data
			})

		} catch (err) {
			console.error('err', err)
		}
	}
}

export const signOut = () => {
	return async dispatch => {
		await axios.get(`${api_base_url}/users/signout`);
		localStorage.removeItem("user");
		dispatch({
			type: AUTH_SIGN_OUT
		})
	};
}