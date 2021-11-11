/* eslint-disable camelcase */

export type ApiPosition = {
  id: string;
  position_name: string;
};

export type ApiCandidate = {
  id: string;
  first_name: string;
  last_name: string;
  image_url: string;
};

export type ApiGovernement = {
  candidate?: ApiCandidate;
  position: ApiPosition;
}[]

export type ApiConfig = {
  configRef: string;
  id: number;
};

export type newGovernmentType = {
  config_ref: number;
  position: number;
  candidate: number;
};

export type ApiNewGovernment = newGovernmentType[];

/* eslint-disable camelcase */
