import axios from 'axios';
import { Candidate } from '../../redux/Candidates/state';
import { Position } from '../../redux/Positions/state';
import endpoint from '../endpoints.config';

/** The driver a rich-config based on the given id */
export const fetchRichConfigAPI = (id: number) =>
  axios.get(`${endpoint.ApiBaseUrl}/api/richConfigs/`, {
    params: {
      config_ref: id
    }
  });

/** Book a config slot on server (the id returned will have to be used to save a couple) */
export const bookConfigAPI = () =>
  axios.post('api/configRefs/', {
    save_date: null,
    user: null
  });

export type SaveCouplesParams = {
  configRef: string;
  candidate: Candidate['id'];
  position: Position['id'];
}[];
/** Send a set of position/candidate couples to API to save on a booking reference */
export const saveCouplesAPI = (params: SaveCouplesParams) =>
  axios.post('/api/configs', params)
