import {Airport} from './airport.model';
import {Airline} from './airline.model';
import {Plane} from './plane.model';

export interface Flight {
  id: number;
  date: string;
  time: string;
  callsign: string;
  departure: Airport;
  airline: Airline;
  plane: Plane;
}
