import {AsyncStorage} from 'react-native';
import createDataContext from "./createDataContext";
import trackerApi from '../api/tracker';
import {navigate} from "../navigationRef";

const locationReducer = (state, action) => {
    switch (action.type) {
        case 'sendUserData':
            return {errorMessage:'', token: action.payload }
        default:
            return state;
    }
};

const sendUserData = dispatch => {
    return async ({coords}) => {
        try {
            const response = await trackerApi.post('/locationData2', {coords});
            dispatch({type: 'sendUserData', payload: response.data}); //sonuçta ikisi de aynı şeyi yapıyor farklı farklı switch caselerine gerek yok.
            console.log(response.data)
        } catch (err) {
            dispatch({type: 'add_error', payload: 'Something went wrong with Sign up'}) //Remember we always call dispatch anytime we want to update our state.
        }
    };
};

export const { Context, Provider} =createDataContext(
    locationReducer,
    {sendUserData}
);