import { Dates } from './dates';
import { ImageStatusCodes } from './imageStatusCodes';

export interface ImageSearchCriteriaModel {
  labelId?: number;
  searchDates?: Dates;
  imageStatusCode?: ImageStatusCodes;
}
