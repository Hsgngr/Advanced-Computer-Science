import createDataContext from "./createDataContext";
import trackerApi from '../api/tracker';

const authReducer = (state, action) => {
    switch (action.type) {
        case 'add_error':
            return  {...state, errorMessage: action.payload}; // ...state means take all the properties out of that state object and add them to new this one.
        default:
            return state;
    }
};

const signup = dispatch => {
    return async ({email, password}) => {
        try {
            const response = await trackerApi.post('/signup', {email, password});
            console.log(response.data);
        } catch (err) {
            dispatch({type: 'add_error', payload: 'Something went wrong with sign up'}) //Remember we always call dispatch anytime we want to update our state.
        }
    };
};

const signin = dispatch => {
    return ({email, password}) => {
        //make api request to sign in with that email and password.

        //if we sign in, modify our state, and say that we are authenticated

        //if signing in fails, need to reflect an error message somewhere
    };
};

const signout = dispatch => {
    return () => {
        // somehow sign out!
    };
};


export const {Provider, Context} = createDataContext(
    authReducer,
    {signup, signin, signout},
    {isSignedIn: false, errorMessage: ''}
);