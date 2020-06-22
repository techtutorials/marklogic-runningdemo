import React from 'react'
import { connect } from 'react-redux';
import { isAuthenticated } from './../redux'
import getJWTToken from './../helper/GetJWTToken'

let jwtToken;

function Auth(props) {
    jwtToken = getJWTToken();

    const redirectToSearch = ()=>{
        props.history.push('/search');
    }

    if (!jwtToken) {
        window.location.href = ('https://127.0.0.1:5000/app/login');
        return;
    }
    else{
        window.onload = props.isAuthenticated
    }
    return (
     <span>{redirectToSearch()}</span>    
    );

}



const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
}


const mapDispatchToProps = dispatch => {
    return {
        isAuthenticated: () => dispatch(isAuthenticated(jwtToken))
    }
}

export default
    connect(mapStateToProps, mapDispatchToProps)(Auth);
