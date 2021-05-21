import {gql} from 'apollo-angular';

export const FLIGHTS_FROM_AIRPORT_INITIAL = gql`
  query flightsFromAirport($icao: String!, $page: Int!) {
    departure(icao: $icao) {
      id
      flights(req: {page: $page, size: 20}) {
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
  }
`;

export const FLIGHTS_FROM_AIRPORT = gql`
  query flightsFromAirport($icao: String!, $page: Int!) {
    departure(icao: $icao) {
      id
      flightsPage(req: {page: $page, size: 20}) {
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
  }
`;
