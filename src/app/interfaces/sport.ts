import { ISourceSport } from 'src/app/interfaces/sourceSport';
import { ISportTranslation } from 'src/app/interfaces/sportTranslation';


export interface ISport {
  id: string;
  name: string;
  sourceSports: ISourceSport[];
  translations: ISportTranslation[];
  createdAt?: string;
  createdBy?: string;
  deleted?: boolean;
}
