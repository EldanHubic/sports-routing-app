import { ICountry } from './country';
import { ISourceCompetitor } from './sourceCompetitor';
import { ICompetitorTranslation } from './competitorTranslation'; 

export interface ICompetitor {
  id: string;
  name: string;
  sportID: string;
  countryID: string;
  country: ICountry;
  sourceCompetitors: ISourceCompetitor[];
  translations: ICompetitorTranslation[];
  createdAt?: string;
  createdBy?: string;
  lastCheckedBy?: string;
  lastCheck?: string;
  deleted?: boolean;
}
