import axios from "axios";

const instance = axios.create({
  baseURL:  "https://api-test.slimeroyale.com/",
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  }
})

const TOKEN_PAYLOAD_KEY = 'Authorization'

instance.interceptors.request.use(async (config) => {
  const tokens = localStorage.getItem('_gameAccessToken');
  if (tokens) {
    if (config.headers) {
      config.headers[TOKEN_PAYLOAD_KEY] = `Bearer ${tokens}`
    }
  }
  return config
})

export default instance;
