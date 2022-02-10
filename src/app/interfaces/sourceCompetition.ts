export interface ISourceCompetition {
  competitionID: string;
  source: number;
  sourceCompetitionID: string;
  sourceSportID: string;
  sourceCategoryID: string;
  currentSourceSeasonID: string;
  name: string;
  pairedAt?: string;
  pairedBy?: string;
}
