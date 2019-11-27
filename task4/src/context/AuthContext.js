import {AsyncStorage} from 'react-native';
import createDataContext from "./createDataContext";
import trackerApi from '../api/tracker';
import {navigate} from "../navigationRef";

const authReducer = (state, action) => {
    switch (action.type) {
        case 'add_error':
            return {...state, errorMessage: action.payload}; // ...state means take all the properties out of that state object and add them to new this one.
        case 'signin': //sonuçta ikisi de aynı şeyi yapıyor farklı farklı switch caselerine gerek yok.
            return {errorMessage: '', token: action.payload}; //Since we signup error message should go away. Restart your errorMessage variable.

        case 'clear_error_message':
            return{...state, errorMessage:' '}
        default:
            return state;
    }
};

const clearErrorMessage = dispatch => () => {
  dispatch({type: 'clear_error_message'})
};

const signup = dispatch => {
    return async ({email, password}) => {
        try {
            const response = await trackerApi.post('/signup', {email, password});
            await AsyncStorage.setItem('token', response.data.token);
            dispatch({type: 'signin', payload: response.data.token}); //sonuçta ikisi de aynı şeyi yapıyor farklı farklı switch caselerine gerek yok.

            navigate('mainFlow');
        } catch (err) {
            dispatch({type: 'add_error', payload: 'Something went wrong with Sign up'}) //Remember we always call dispatch anytime we want to update our state.
        }
    };
};

const signin = dispatch => {
    return async ({email, password}) => {
        try {
            const response = await trackerApi.post('/signin', {email, password});
            await AsyncStorage.setItem('token', response.data.token);
            dispatch({type: 'signin', payload: response.data.token}); //sonuçta ikisi de aynı şeyi yapıyor farklı farklı switch caselerine gerek yok.

            navigate('mainFlow');
        } catch (err) {
            dispatch({
                type: 'add_error',
                payload: 'Something went wrong with Sign in'
            });
        }
    };
};

const signout = dispatch => {
    return () => {
        // somehow sign out!
    };
};


export const {Provider, Context} = createDataContext(
    authReducer,
    {signup, signin, signout, clearErrorMessage},
    {token: null, errorMessage: ''}
);