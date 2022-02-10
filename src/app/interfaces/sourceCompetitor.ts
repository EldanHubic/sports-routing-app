export interface ISourceCompetitor {
  competitorID: string;
  source: number;
  sourceCompetitorID: string;
  name: string;
  sourceSportID: string;
  sourceCountryID: string;
  pairedAt?: string;
  pairedBy?: string;
}
