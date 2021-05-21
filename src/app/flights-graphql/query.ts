import {gql} from 'apollo-angular';

export const FLIGHTS_BY_DATE = gql`
  query flightsByDate($date: Date!, $page: Int!, $size: Int!) {
    day(date: $date) {
      id
      flights(req: {page: $page, size: $size}) {
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
  }
`;
