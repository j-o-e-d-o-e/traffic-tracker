import {gql} from 'apollo-angular';

export const GET_FLIGHTS_BY_AIRLINE_INITIAL = gql`
  query GetFlightsByAirline($icao: String!, $page: Int!) {
    airline(icao: $icao) {
      id
      icao
      name
    }
    flightsByAirline(icao: $icao, page: $page, size: 20) {
      totalPages
      totalElements
      pageNumber
      content {
        id
        date
        time
        departure {
          id
          icao
          name
        }
        plane {
          id
          icao
        }
      }
    }
  }
`;

export const GET_FLIGHTS_BY_AIRLINE = gql`
  query GetFlightsByAirline($icao: String!, $page: Int!) {
    flightsByAirline(icao: $icao, page: $page, size: 20) {
      totalPages
      totalElements
      pageNumber
      content {
        id
        date
        time
        departure {
          id
          icao
          name
        }
        plane {
          id
          icao
        }
      }
    }
  }
`;
