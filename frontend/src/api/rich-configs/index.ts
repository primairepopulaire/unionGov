import axios from 'axios';

/** The driver a rich-config based on the given id */
export const fetchRichConfigAPI = (id: number) =>
  axios.get('/api/richConfigs/', {
    params: {
      config_ref: id
    }
  });
