import {combineReducers} from 'redux';
import authReducer from './auth/authReducer';
import searchreducer from './search/searchReducer'
import {reducer as formReducer} from 'redux-form';
import searchReducer from './search/searchReducer';

export default combineReducers({
    auth: authReducer,
    search: searchReducer,
    form: formReducer
});