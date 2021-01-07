import {
    PRODUCT_UPLOAD_SUCCESS,
    PRODUCT_UPLOAD_ERROR,
    PRODUCT_GET_SUCCESS,
    PRODUCT_GET_ERROR,
    PRODUCTS_GET_SUCCESS,
    PRODUCTS_GET_ERROR
} from '../actions/types';

const DEFAULT_STATE = {
    errorMessage: '',
    status: '',
    productsGetData: {},
    SingleProductGetData: {}
}

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case PRODUCT_UPLOAD_SUCCESS:
            return { ...state, status: action.payload }
        case PRODUCTS_GET_SUCCESS:
            return { ...state, productsGetData: action.payload }
        case PRODUCT_GET_SUCCESS:
            return { ...state, SingleProductGetData: action.payload }
        case PRODUCT_UPLOAD_ERROR:
        case PRODUCTS_GET_ERROR:
        case PRODUCT_GET_ERROR:
            return { ...state, errorMessage: action.payload }
        default:
            return state
    }
}