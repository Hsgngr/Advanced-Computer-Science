import axios from 'axios';

export default axios.create({
    baseURL: 'http://f03bed42.ngrok.io' // In every 8 hours ngrok is going to fail to request. We should change this url.
});