import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {NgbDropdown, NgbDropdownItem, NgbDropdownMenu, NgbDropdownToggle, NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {NgChartsModule} from 'ng2-charts';
import {HttpClientModule} from "@angular/common/http";
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {FormsModule} from "@angular/forms";
import {GraphQLModule} from './graphql.module';
import {AppComponent} from './app.component';
import {DataService} from "./service/data.service";
import {ErrorComponent} from './error/error.component';
import {SpinnerComponent} from './spinner/spinner.component';
import {HeaderComponent} from './header/header.component';
import {HomeComponent} from './home/home.component';
import {StatsComponent} from './stats/stats.component';
import {ForecastComponent} from './forecast/forecast.component';
import {YearComponent} from './year/year.component';
import {MonthComponent} from './month/month.component';
import {WeekComponent} from './week/week.component';
import {DayComponent} from './day/day.component';
import {DepartureComponent} from './departure/departure.component';
import {FlightComponent} from './flight/flight.component';
import {PlaneComponent} from "./plane/plane.component";
import {AirportComponent} from './airport/airport.component';
import {FooterComponent} from './footer/footer.component';
import {AirlineComponent} from "./airline/airline.component";
import {PhotoComponent} from "./photo/photo.component";


@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    SpinnerComponent,
    HeaderComponent,
    HomeComponent,
    ForecastComponent,
    StatsComponent,
    YearComponent,
    MonthComponent,
    WeekComponent,
    DayComponent,
    DepartureComponent,
    FlightComponent,
    PlaneComponent,
    AirportComponent,
    AirlineComponent,
    PhotoComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbDropdown,
    NgbDropdownToggle,
    NgbDropdownMenu,
    NgbDropdownItem,
    NgbModule,
    NgChartsModule,
    FontAwesomeModule,
    FormsModule,
    GraphQLModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
