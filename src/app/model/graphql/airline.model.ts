import {Flight} from './flight.model';

export interface Airline {
  id: number;
  icao: string;
  name: string;
  flights: Flight[];
}

