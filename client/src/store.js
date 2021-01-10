import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const initialState = {};

// The store holds the complete state tree of your app.
/*
:param reducer: A reducing function that returns the next state tree, given the current state tree and an action to handle.
:param preloadedState: The initial state
:param enhancer: The store enhancer - applyMiddleware(), and add support for redux devtools in chrome.
*/
const store = createStore(
	rootReducer,
	initialState,
	applyMiddleware(thunk)
);

export default store;
