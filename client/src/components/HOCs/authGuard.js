import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';

export default (OriginalComponent) => {
  class MixedComponent extends Component {

    checkAuth() {
      if (!this.props.isAuth){
        if(this.props.location.pathname !== "/registro") this.props.history.push('/iniciar-sesion');
      }
      else{
        if(this.props.location.pathname === "/registro" || this.props.location.pathname === "/iniciar-sesion") this.props.history.push('/');
      }
    }

    async componentWillMount(){
      await this.props.checkAuth();
      this.checkAuth();
    }

    render() {
      return <OriginalComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return {
      isAuth: state.auth.isAuthenticated
    }
  }

  return connect(mapStateToProps,actions)(MixedComponent);
};