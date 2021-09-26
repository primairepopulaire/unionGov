import axios from 'axios'
import endpoint from '../endpoints.config';

/** The driver fetching positions through the internet */
export const fetchAllPositionsAPI = () => axios.get(`${endpoint.ApiBaseUrl}/api/positions/`)
