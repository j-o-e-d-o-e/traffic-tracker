// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // urlBase: 'http://localhost:8080/api',
  // uriGraphQL: 'http://localhost:8080/graphql',
  urlBase: 'https://traffic-tracker.herokuapp.com/api',
  uriGraphQL: 'https://traffic-tracker.herokuapp.com/graphql',
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
