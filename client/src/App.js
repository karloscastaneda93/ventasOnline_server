import React, { Component } from "react";
import { Provider } from "react-redux";
import {
	BrowserRouter as Router,
	Route,
	Switch
} from "react-router-dom";

import axios from 'axios';

import store from "./store";

import "./App.css";

import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import NotFound from "./components/NotFound/NotFound";
import ProductsUpload from "./components/ProductsUpload/ProductsUpload";
import ProductPage from "./components/ProductPage/ProductPage";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import Footer from "./components/Footer/Footer";

import authGuard from './components/HOCs/authGuard';

axios.defaults.withCredentials = true;

class App extends Component {

	state = {
		isNotFoundPage: false
	};

	handleNotFound = () => {
		this.setState({ isNotFoundPage: true });
	}

	render() {
		const { isNotFoundPage } = this.state;
		return (
			// Provider: wraps the React application and makes the Redux state available to all container components in the application’s hierarchy
			<Provider store={store}>
				<Router>
						{!isNotFoundPage && <Header />}
						<div style={{minHeight:'85vh'}}>
							<Switch>
								<Route exact path="/" component={authGuard(Home)} />
								<Route path="/products/upload" component={authGuard(ProductsUpload)} />
								<Route path="/product/:id" component={authGuard(ProductPage)} />
								<Route path="/iniciar-sesion" component={authGuard(SignIn)} />
								<Route path="/registro" component={authGuard(SignUp)} />
								<Route path="*">
									<NotFound onNotFound={this.handleNotFound} />
								</Route>
							</Switch>
						</div>
						{!isNotFoundPage && <Footer />}
					</Router>
			</Provider>
		);
	}
}

export default App;