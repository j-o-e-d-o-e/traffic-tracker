export interface Flights {
  _embedded: {
    flightDtoes: Flight[]
  };
  _links: {
    next: { href: string }
    prev: { href: string }
    self: { href: string }
    last: { href: string }
  };
  page: {
    number: number;
    totalPages: number;
  };
}

export interface Flight {
  id: number;
  altitude: number;
  callsign: string;
  date_time: string;
  date: string;
  icao_24: string;
  speed: number;
  departure_icao: string;
  departure_name: string;
  airline_icao: string;
  airline_name: string;
  photo: boolean;
  _links: {
    day: { href: string }
    icao_24: { href: string }
    photo_url: {href: string}
    self: { href: string }
  };
}
