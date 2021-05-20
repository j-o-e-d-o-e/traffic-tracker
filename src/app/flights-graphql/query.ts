import {gql} from 'apollo-angular';

export const GET_FLIGHTS_BY_DATE = gql`
  query GetFlightsByDate($date: Date!, $page: Int!, $size: Int!) {
    flightsByDate(date: $date, page: $page, size: $size) {
      totalPages
      totalElements
      pageNumber
      content {
        id
        time
        altitude
        speed
        plane {
          id
          icao
        }
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
