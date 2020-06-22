import React, { Component } from 'react';
import { connect } from 'react-redux';

export default ChildComponent => {
  class ComposedComponent extends Component {
    // Our component just got rendered
    componentDidMount() {
      this.shouldNavigateAway();
    }

    // Our component just got updated
    componentDidUpdate() {
      this.shouldNavigateAway();
    }

    shouldNavigateAway() {
      if (!this.props.auth) {
        console.log("111111111111111111111111111111111")
        console.log(this.props)
        console.log(this.props.history)
        console.log(this.props.history.push('/'))

        this.props.history.push('/');
      }
    }

    render() {
      return <ChildComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
      console.log("XXXXXXXXXXXXXXXXXXXXX")
      console.log(state.auth.isAuthenticated)
    return { auth: state.auth.isAuthenticated };
  }

  return connect(mapStateToProps)(ComposedComponent);
};