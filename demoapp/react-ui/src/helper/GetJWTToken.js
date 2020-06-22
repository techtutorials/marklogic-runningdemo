import Cookies from 'js-cookie';

function getJWTToken(){
    return Cookies.get('jwtToken')
}

export default getJWTToken