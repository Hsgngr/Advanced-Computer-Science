import axios from 'axios';

export default axios.create({
    baseURL: 'http://e6218eb6.ngrok.io' // In every 8 hours ngrok is going to fail to request. We should change this url.
});