import axios from 'axios';
import { ApiNewGovernment } from '../../types/api';
import endpoint from '../endpoints.config';

export const setGovernmentAPI = (newGovernment: ApiNewGovernment) =>
  axios.post(`${endpoint.ApiBaseUrl}/api/configs/`, newGovernment);
