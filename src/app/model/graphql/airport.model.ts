import {Flight} from './flight.model';

export interface Airport {
  id: number;
  icao: string;
  name: string;
  region: string;
  flights: Flight[];
}
