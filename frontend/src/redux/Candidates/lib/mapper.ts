import { ApiCandidate } from '../../../types/api'
import { Candidate } from '../state'

/* eslint-disable camelcase */

/** Transform a server candidate object into a front-readable one */
export const mapApiToCandidate = ({
  id,
  first_name,
  last_name,
  image_url
}: ApiCandidate): Candidate => ({
  id,
  firstName: first_name,
  lastName: last_name,
  imageUrl: image_url
})
/* eslint-disable camelcase */

/** Transform a server candidate object set into a front-readable one */
export const mapApiToCandidates = (raw: ApiCandidate[]): Candidate[] =>
  raw.map(mapApiToCandidate)
