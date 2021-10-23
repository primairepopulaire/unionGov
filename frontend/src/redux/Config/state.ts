/** A Config as saved in redux state */
export type ConfigState = {
    configRef?: string;
  };

export const initialConfigState = (): ConfigState => ({})
