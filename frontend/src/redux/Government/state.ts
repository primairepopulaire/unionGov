import { Candidate } from '../Candidates/state';
import { Position } from '../Positions/state';

/** The data associated to a governement position */
export type CoupleConfig = {
  candidateId: Candidate['id'];
  /** ISO date string of the last time this couple was successfully sent to the server */
  savedAt?: string;
  isSaving?: boolean;
  savingError?: string;
}

/** The user's government configuration */
export type GovernmentState = {
  /** The list of position/candidate couple */
  couples: Record<Position['id'], CoupleConfig | undefined>;
  /** The backend-generated couples config reference to use as a share link */
  shareRef?: string;
  /** Are we currently sending the governement conf' to the server ? */
  isSaving?: boolean;
  /** The eventual general server saving error */
  savingError?: string;
};

export const initialGovernmentState = (): GovernmentState => ({
  couples: {}
})
