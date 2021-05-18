import {gql} from 'apollo-angular';

export const GET_FLIGHTS_FROM_AIRPORT_INITIAL = gql`
  query GetFlightsFromAirport($icao: String!, $page: Int!) {
    departure(icao: $icao) {
      id
      icao
      name
    }
    flightsFromAirport(icao: $icao, page: $page, size: 20) {
      totalPages
      totalElements
      pageNumber
      content {
        id
        date
        time
        airline {
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

export const GET_FLIGHTS_FROM_AIRPORT = gql`
  query GetFlightsFromAirport($icao: String!, $page: Int!) {
    flightsFromAirport(icao: $icao, page: $page, size: 20) {
      totalPages
      totalElements
      pageNumber
      content {
        id
        date
        time
        airline {
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
