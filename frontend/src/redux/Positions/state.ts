import { createEntityAdapter } from '@reduxjs/toolkit';

/** A position as saved in redux state */
export type Position = {
  id: string;
  name: string;
};

type ExtraEntityState = {
  loading: {
    all: boolean;
  } & Partial<Record<Position['id'], boolean>>;
};

export const positionsAdapter = createEntityAdapter<Position>({
  // Assume IDs are stored in a field other than `book.id,
  selectId: (position) => position.id
})

export const initialPositionsState = () =>
  positionsAdapter.getInitialState<ExtraEntityState>({
    loading: {
      all: false
    }
  })
