import { 
    DASHBOARD_GET_DATA, 
    AUTH_LINK_FACEBOOK,
    AUTH_UNLINK_FACEBOOK  
  } from '../actions/types';
  
  const DEFAULT_STATE = {
    user: {},
    methods: []
  }
  
  export default (state = DEFAULT_STATE, action) => {
    switch(action.type) {
      case AUTH_LINK_FACEBOOK:
        return { ...state, methods: action.payload.methods }
      case AUTH_UNLINK_FACEBOOK:
        return { ...state, methods: action.payload.methods }
      case DASHBOARD_GET_DATA:
        return { ...state, user: action.payload.user }
      default:
        return state
    }
  }