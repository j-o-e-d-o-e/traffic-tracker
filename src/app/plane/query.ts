import {gql} from 'apollo-angular';

export const GET_FLIGHTS_BY_PLANE = gql`
  query GetFlightsByPlane($icao: String!, $page: Int!) {
    flightsByPlane(icao: $icao, page: $page, size: 20) {
      totalPages
      totalElements
      pageNumber
      content {
        id
        date
        time
        callsign
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
`;