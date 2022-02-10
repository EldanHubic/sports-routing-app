import { ICategoryTranslation } from './categoryTranslation';
import { ICountry } from './country';
import { ISourceCategory } from './sourceCategory';


export interface ICategory {
  id: string;
  name: string;
  sportID: string;
  country: ICountry;
  countryID?: string;
  sourceCategories: ISourceCategory[];
  translations: ICategoryTranslation[];
  createdAt?: string;
  createdBy?: string;
  deleted?: boolean;
}
