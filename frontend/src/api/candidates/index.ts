import axios from 'axios';
import endpoint from '../endpoints.config';

axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
axios.defaults.xsrfCookieName = 'csrftoken';

/** The driver fetching candidates through the web */
export const fetchAllCandidatesAPI = () => axios.get(`${endpoint.ApiBaseUrl}/api/candidates/`)
