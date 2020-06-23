import { SEARCH_TERM, SEARCH_ERROR } from './searchTypes'

const INITIAL_STATE = {
  searchResult: '',
  errorMessage: ''
};

const searchReducer = (state = INITIAL_STATE, action)=> {
  switch (action.type) {
    case SEARCH_TERM:
        // console.log("=========Inside Search Reducer=========");
        // console.log(action.payload)
      return { ...state, searchResult: action.payload };
    case SEARCH_ERROR:
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
}

export default searchReducer
