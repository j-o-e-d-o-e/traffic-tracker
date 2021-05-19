import {gql} from 'apollo-angular';

export const GET_FLIGHTS_BY_DATE = gql`
  query GetFlightsByDate($date: String!, $page: Int!) {
    flightsByDate(date: $date, page: $page, size: 20) {
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
