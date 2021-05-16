import {Day} from './day.model';
import {Flight} from './flights.model';
import {Departure} from './departure.model';
import {KeyValue} from './key-value.model';

export interface Stats {
  total: number;
  day_with_most_flights: {'day': Day, stats: number};
  day_with_most_flights_within_one_hour: {'day': Day, stats: number};
  days_with_less_than_thirty_flights: number;
  hours_with_no_flights: number;
  departures: Departure;
  airports: KeyValue[];
  plane_with_most_flights: {'icao': string, 'stats': number};
  plane_with_most_flights_within_one_day: {'day': Day, 'stats': number, 'icao': string};
  max_altitude: Flight;
  min_altitude: Flight;
  max_speed: Flight;
  min_speed: Flight;
  airlines: KeyValue[];
  score: Score;
}

export interface Score {
  precision: number;
  mean_abs_error: number;
  confusion_matrix: any;
  recall: number;
}
