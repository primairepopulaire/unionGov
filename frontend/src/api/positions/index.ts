import axios from 'axios';
import endpoint from '../endpoints.config';

axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
axios.defaults.xsrfCookieName = 'csrftoken';
/** The driver fetching positions through the internet */
export const fetchAllPositionsAPI = () => axios.get(`${endpoint.ApiBaseUrl}/api/positions/`)
