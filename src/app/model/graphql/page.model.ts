import {Flight} from './flight.model';

export interface Page {
  content: [Flight];
  totalElements: number;
  totalPages: number;
  pageNumber: number;
}
