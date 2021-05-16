import {KeyValue} from './key-value.model';
import {Departure} from './departure.model';

export interface Year {
  avg_altitude: number;
  avg_flights: number[];
  avg_speed: number;
  days_with_less_than_thirty_flights: number;
  end_date: string;
  first_month: number;
  next: boolean;
  now: string;
  flights_0: number;
  flights_23: number;
  prev: boolean;
  start_date: string;
  total: number;
  months: number[];
  year: number;
  departures: Departure;
  airports: KeyValue[];
  _links: {
    months: { href: string }
    next_year: { href: string }
    prev_year: { href: string }
    self: { href: string }
  };
}
