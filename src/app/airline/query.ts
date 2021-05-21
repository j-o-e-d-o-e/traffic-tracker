import {gql} from 'apollo-angular';

export const FLIGHTS_BY_AIRLINE_INITIAL = gql`
  query flightsByAirline($icao: String!, $page: Int!) {
    airline(icao: $icao) {
      id
      icao
      name
      flights(req: {page: $page, size: 20}) {
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
  }
`;

export const FLIGHTS_BY_AIRLINE = gql`
  query flightsByAirline($icao: String!, $page: Int!) {
    airline(icao: $icao) {
      id
      flightsPage(req: {page: $page, size: 20}) {
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
  }
`;
