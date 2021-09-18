import { ApiPosition } from '../../../types/api'
import { Position } from '../state'

/* eslint-disable camelcase */

/** Transform a server position object into a front-readable one */
export const mapApiToPosition = ({
  id,
  position_name
}: ApiPosition): Position => ({
  id,
  name: position_name
})
/* eslint-disable camelcase */

/** Transform a server position object set into a front-readable one */
export const mapApiToPositions = (raw: ApiPosition[]): Position[] =>
  raw.map(mapApiToPosition)
