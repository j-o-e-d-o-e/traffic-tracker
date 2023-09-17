import {gql} from 'apollo-angular';

export const FLIGHTS_BY_AIRLINE = gql`
  query flightsByAirline($icao: String!, $page: Int!, $size: Int!) {
    airline(icao: $icao) {
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
