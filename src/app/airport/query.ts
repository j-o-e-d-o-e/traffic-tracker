import {gql} from 'apollo-angular';

export const FLIGHTS_FROM_AIRPORT = gql`
  query flightsFromAirport($icao: String!, $page: Int!, $size: Int!) {
    departure(icao: $icao) {
      id
      icao
      name
      flights(req: {page: $page, size: $size}) {
        totalPages
        totalElements
        pageNumber
        content {
          id
          callsign
          date
          time
          photo
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
