import axios from 'axios';

import {baseURL} from './config';
import Cookies from 'js-cookie';


const _axios = axios.create({
  baseURL,
});
_axios.interceptors.request.use((config: any) => {
    return {
      ...config,
      headers: {
        ...(config?.headers || {}),
        Authorization: `Bearer ${Cookies.get('Authorization') ?? ""}`,
        "Content-Type": "application/json",
        Accept: "*/*",
      },
    };
});

export default _axios;
