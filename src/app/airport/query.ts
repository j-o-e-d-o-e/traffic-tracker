import {gql} from 'apollo-angular';

export const GET_FLIGHTS_OF_AIRPORT = gql`
  query GetFlightsOfAirport($icao: ID!, $offset: Int!){
    departure(icao: $icao) {
      id
      icao
      name
      flights(op: LE, offset: $offset, size: 20) {
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
  }`;
