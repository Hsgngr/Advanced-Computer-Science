import axios from 'axios';

export default axios.create({
    baseURL: 'http://044ffe4c.ngrok.io' // In every 8 hours ngrok is going to fail to request. We should change this url.
});