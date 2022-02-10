// import { ISeason } from './season';
import { ISourceCompetition } from './sourceCompetition';
import { ICompetitionTranslation } from './competitionTranslation';

export interface ICompetition {
  id: string;
  name: string;
  sportID: string;
  categoryID: string;
  // seasons: ISeason[];
  sourceCompetitions: ISourceCompetition[];
  translations: ICompetitionTranslation[];
  createdAt?: string;
  createdBy?: string;
  lastCheckedBy?: string;
  lastCheck?: string;
  deleted?: boolean;
}
