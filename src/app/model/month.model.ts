import {KeyValue} from './key-value.model';
import {Departure} from './departure.model';

export interface Month {
  avg_altitude: number;
  avg_flights: number[];
  avg_speed: number;
  days: number[];
  days_with_less_than_thirty_flights: number;
  end_date: string;
  first_day_of_month: number;
  month: number;
  next: boolean;
  now: string;
  flights_0: number;
  flights_23: number;
  prev: boolean;
  start_date: string;
  total: number;
  year: number;
  departures: Departure;
  airports: KeyValue[];
  _links: {
    next_month: { href: string }
    prev_month: { href: string }
    self: { href: string }
    weeks: { href: string }
    year: { href: string }
  };
}
