import {KeyValue} from "./key-value.model";
import {Departure} from "./departure.model";

export interface Day {
  avg_altitude: number;
  avg_flights: number[];
  avg_speed: number;
  date: string;
  flights: boolean;
  hours_flight: number[];
  hours_wind: number[];
  next: boolean;
  now: string;
  prev: boolean;
  total: number;
  weekday: string;
  wind_speed: number;
  departures: Departure;
  airports: KeyValue[];
  _links: {
    next_day: { href: string }
    flights: { href: string }
    prev_day: { href: string }
    self: { href: string }
    week: { href: string }
  };
}
