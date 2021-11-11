/** A Config as saved in redux state */
export type ConfigState = {
    configRef?: string;
    id?: number;
  };

export const initialConfigState = (): ConfigState => ({})
