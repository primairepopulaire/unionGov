import { Candidate } from '../Candidates/state';
import { Position } from '../Positions/state';

/** The user's government configuration */
export type GovernmentState = Record<Position['id'], Candidate['id']>;

export const initialGovernmentState = (): GovernmentState => ({})
