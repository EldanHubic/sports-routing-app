import { ISourceCountry } from './sourceCountry';

export interface ICountry {
  id: string;
  name: string;
  sourceCountries: ISourceCountry[];
  createdAt?: string;
  createdBy?: string;
  deleted?: boolean;
}
