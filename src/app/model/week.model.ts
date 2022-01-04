import {KeyValue} from './key-value.model';
import {Departure} from './departure.model';

export interface Week {
  avg_altitude: number;
  avg_flights: number[];
  avg_speed: number;
  end_date: string;
  first_day: string;
  month: number;
  next: boolean;
  now: string;
  flights_0: number;
  flights_23: number;
  prev: boolean;
  start_date: string;
  total: number;
  weekdays: number[];
  year: number;
  departures: Departure;
  airports: KeyValue[];
  _links: {
    days: { href: string }
    month: { href: string }
    next_week: { href: string }
    prev_week: { href: string }
    self: { href: string }
  };
}
