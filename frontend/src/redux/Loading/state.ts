export enum LoadingStatusKey {
  Candidates = 'Candidates',
  Positions = 'Positions',
}

/** All the data a loading status key can have */
export type LoadingStatusItem = {
  error?: string;
  isLoading: boolean;
};

export type LoadingStatusItems = Record<string, LoadingStatusItem>;

export type LoadingStatusState = Record<
  string,
  LoadingStatusItem | LoadingStatusItems
>;

export const initialLoadingStatusState = (): LoadingStatusState => ({})
