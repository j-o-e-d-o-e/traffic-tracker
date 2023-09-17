import {gql} from 'apollo-angular';

export const FLIGHTS_BY_PLANE = gql`
  query flightsByPlane($icao: String!, $page: Int!, $size: Int!) {
    plane(icao: $icao) {
      id
      icao
      flights(req: {page: $page, size: $size}) {
        totalPages
        totalElements
        pageNumber
        content {
          id
          date
          time
          callsign
          photo
          airline {
            id
            icao
            name
          }
          departure {
            id
            icao
            name
          }
        }
      }
    }
  }
`;
