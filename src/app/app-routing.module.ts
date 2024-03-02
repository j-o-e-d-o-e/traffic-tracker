import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DayComponent} from "./day/day.component";
import {WeekComponent} from "./week/week.component";
import {MonthComponent} from "./month/month.component";
import {YearComponent} from "./year/year.component";
import {StatsComponent} from "./stats/stats.component";
import {ForecastComponent} from "./forecast/forecast.component";
import {HomeComponent} from "./home/home.component";
import {FlightComponent} from "./flight/flight.component";
import {AirportComponent} from "./airport/airport.component";
import {AirlineComponent} from "./airline/airline.component";
import {PlaneComponent} from "./plane/plane.component";

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'day', component: DayComponent},
  {path: 'day/:date', component: DayComponent},
  {path: 'week', component: WeekComponent},
  {path: 'week/:date', component: WeekComponent},
  {path: 'month', component: MonthComponent},
  {path: 'month/:year/:month', component: MonthComponent},
  {path: 'year', component: YearComponent},
  {path: 'year/:year', component: YearComponent},
  {path: 'forecasts', component: ForecastComponent},
  {path: 'stats', component: StatsComponent},
  {path: 'flights/:date/:page', component: FlightComponent},
  {path: 'plane/:icao/:page', component: PlaneComponent},
  {path: 'airport/:icao/:page', component: AirportComponent},
  {path: 'airline/:icao/:page', component: AirlineComponent},
  {path: '**', redirectTo: 'day', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
