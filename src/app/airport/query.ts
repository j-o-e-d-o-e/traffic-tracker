import {gql} from 'apollo-angular';

export const GET_FLIGHTS_OF_AIRPORT = gql`
  query GetFlightsOfAirport($icao: ID!, $page: Int!){
    departure(icao: $icao) {
      id
      icao
      name
      flights(page: $page, size: 20) {
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
