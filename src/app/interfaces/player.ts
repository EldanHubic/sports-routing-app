import { ISourcePlayer } from './sourcePlayer';

export interface IPlayer {
  id: string;
  name: string;
  sportID: string;
  countryID: string;
  sourcePlayers: ISourcePlayer[];
  createdAt?: string;
  createdBy?: string;
  deleted?: boolean;
}
