import { SEARCH_TERM } from './searchTypes'
import axios from 'axios'
import XMLtoObject from './../../helper/XMLtoObject'
import getJWTToken from './../../helper/GetJWTToken'


export const searchKeyword = (formProps, callback) => async dispatch => {
  try {
    // console.log("=======Inside action searchActions -> searchKeyword=====");
    // console.log(formProps.searchTerm)
    //console.log(`Bearer ${getJWTToken()}`)
    if(!formProps.searchTerm){
      console.log("No search term defined")
      return;
    }
     const response = await axios.get(
        `https://127.0.0.1:5000/app/search?searchTerm=${formProps.searchTerm}`,
        {
          headers: {
            'Authorization': `jwt ${getJWTToken()}`
          }
        }
      );
    // console.log("RESULTTTTTTTTTTTTTTTTTTTTTTTTTTTTT")
    //change value title in nodejs and then here
    let responseArray = response.data.searchResult
    let jsonObj = {}
    let resultArray = []
    // console.log(responseArray.length)
    responseArray.forEach(element => {
      let xmlResponse = element.content
     
      // console.log("xmlResponse.......................")
      // console.log(xmlResponse)
      jsonObj = XMLtoObject(xmlResponse)
      console.log("jsonResponse.......................")
      console.log(jsonObj)
     
      
      resultArray.push(jsonObj)
    });
    // console.log(resultArray)
    // console.log("RESULTTTTTTTTTTTTTTTTTTTTTTTTTTTTT..........ENDDDDDDD")
    dispatch({ type: SEARCH_TERM, payload: { 'result': resultArray } });
    callback();

  } catch (e) {
    // dispatch({ type: AUTH_ERROR, payload: 'Email in use' });
  }
};

export const searchTopic = (searchTerm, callback) => async dispatch => {
  try {
    console.log("=======Inside action searchActions -> searchChip=====");
    // console.log(searchTerm)
    //console.log(`Bearer ${getJWTToken()}`)
    if(!searchTerm){
      console.log("No search term defined")
      return;
    }
     const response = await axios.get(
        `https://127.0.0.1:5000/app/search?searchTerm=${searchTerm}`,
        {
          headers: {
            'Authorization': `jwt ${getJWTToken()}`
          }
        }
      );
    let responseArray = response.data.searchResult
    let jsonObj = {}
    let resultArray = []
    // console.log(responseArray.length)
    responseArray.forEach(element => {
      let xmlResponse = element.content
      // console.log("xmlResponse.......................")
      // console.log(xmlResponse)
      jsonObj = XMLtoObject(xmlResponse)
      // console.log("jsonResponse.......................")
      // console.log(jsonObj)
     
      resultArray.push(jsonObj)
    });
    // console.log(resultArray)
    // console.log("RESULTTTTTTTTTTTTTTTTTTTTTTTTTTTTT..........ENDDDDDDD")
    dispatch({ type: SEARCH_TERM, payload: { 'result': resultArray } });
    callback();

  } catch (e) {
    // dispatch({ type: AUTH_ERROR, payload: 'Email in use' });
  }
};

// export { searchKeyword as default }