import {Departure} from './departure.model';
import {KeyValue} from './key-value.model';

export interface Stats {
  days_total: number;
  flights_total: number;
  day_with_most_flights: StatsDay;
  day_with_most_flights_within_one_hour: StatsDay;
  days_with_less_than_thirty_flights: number;
  hours_with_no_flights: number;
  departures: Departure;
  airports: KeyValue[];
  plane_with_most_flights: StatsPlane;
  plane_with_most_flights_within_one_day: StatsPlane;
  max_altitude: StatsPlane;
  min_altitude: StatsPlane;
  max_speed: StatsPlane;
  min_speed: StatsPlane;
  airlines: KeyValue[];
  score: Score;
}

export interface StatsDay {
  date: string;
  stats: number;
}

export interface StatsPlane {
  date: string;
  icao: string;
  stats: number;
}

export interface Score {
  precision: number;
  mean_abs_error: number;
  confusion_matrix: any;
  recall: number;
}
