import axios from 'axios';
import { returnErrors } from './errorActions'

import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS
} from './types';

//check token and load user 
export const loadUser = () => (dispatch, getState) => {
  //User Loading
  dispatch({ type: USER_LOADING });



  axios.get('api/auth/user', tokenConfig(getState))
    .then(res => dispatch({
      type: USER_LOADED,
      payload: res.data
    }))
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status))
      dispatch({
        type: AUTH_ERROR
      })
    })
}

//setup config/headers
export const tokenConfig = getState => {
  //Get token from local storage
  const token = getState().auth.token;

  //headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  }

  // If token, add to the headers
  if (token) {
    config.headers['x-auth-token'] = token;
  }

  return config;
}