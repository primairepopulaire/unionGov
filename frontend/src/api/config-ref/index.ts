import axios from 'axios';
import endpoint from '../endpoints.config';

/** The driver a new rich-config */
export const fetchNewConfigRef = () =>
  axios.post(`${endpoint.ApiBaseUrl}/api/configRefs/`, {
    params: {
      save_date: null,
      user: null
    }
  });
