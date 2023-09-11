// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // urlBase: 'http://localhost:8080/api',
  // urlGraphIQL: 'http://localhost:8080/graphiql',
  urlBase: 'https://traffic-tracker-817b828649ad.herokuapp.com/api',
  urlGraphQL: 'https://traffic-tracker-817b828649ad.herokuapp.com/graphiql',
  startYear: 2019,
  startMonth: 9,
  startDay: 9,
  departuresStartDate: '2020-09-09',
  airlinesStartDate: '2020-09-23',
  maxPageSize: 20
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
