import {gql} from 'apollo-angular';

export const GET_FLIGHTS_OF_AIRLINE = gql`
  query GetFlightsOfAirline($icao: ID!, $offset: Int!){
    airline(icao: $icao) {
      id
      icao
      name
      flights(op: LE, offset: $offset, size: 20) {
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
  }`;
