import axios from 'axios'

/** The driver fetching positions through the internet */
export const fetchAllPositionsAPI = () => axios.get('/api/positions/')
