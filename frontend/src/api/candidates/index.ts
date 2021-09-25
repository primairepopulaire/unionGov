import axios from 'axios'
import endpoint from '../endpoints.config';

/** The driver fetching candidates through the web */
export const fetchAllCandidatesAPI = () => axios.get(`${endpoint.ApiBaseUrl}/api/candidates/`)
