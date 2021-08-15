import { createEntityAdapter } from '@reduxjs/toolkit'

/** Candidate as stored in redux */
export type Candidate = {
  id: string;
  firstName: string;
  lastName: string;
  imageUrl: string;
};

type ExtraEntityState = {
  loading: {
    all: boolean;
  } & Partial<Record<Candidate['id'], boolean>>;
};

export const candidatesAdapter = createEntityAdapter<Candidate>({
  // Assume IDs are stored in a field other than `book.id,
  selectId: (candidate) => candidate.id
})

export const initialCandidatesState = () =>
  candidatesAdapter.getInitialState<ExtraEntityState>({
    loading: {
      all: false
    }
  })
