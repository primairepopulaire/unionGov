import axios from 'axios'

/** The driver fetching candidates through the web */
export const fetchAllCandidatesAPI = () => axios.get('/api/candidates/')
