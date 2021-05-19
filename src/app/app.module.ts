import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {APOLLO_OPTIONS} from 'apollo-angular';
import {HttpLink} from 'apollo-angular/http';
import {InMemoryCache} from '@apollo/client/core';
import {environment} from '../environments/environment';
import {AirlineComponent} from './airline/airline.component';
import {DataService} from './service/data.service';
import {FooterComponent} from './footer/footer.component';
import {HeaderComponent} from './header/header.component';
import {DayComponent} from './day/day.component';
import {WeekComponent} from './week/week.component';
import {MonthComponent} from './month/month.component';
import {YearComponent} from './year/year.component';
import {FlightsRestComponent} from './flights-rest/flights-rest.component';
import {HomeComponent} from './home/home.component';
import {PlaneRestComponent} from './plane-rest/plane-rest.component';
import {ForecastComponent} from './forecast/forecast.component';
import {ErrorComponent} from './error/error.component';
import {StatsComponent} from './stats/stats.component';
import {DepartureComponent} from './departure-pie/departure.component';
import {FormsModule} from '@angular/forms';
import {ChartsModule} from 'ng2-charts';
import {TooltipModule} from 'ng2-tooltip-directive';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AirportComponent} from './airport/airport.component';
import {PlaneComponent} from './plane/plane.component';
import {FlightsComponent} from './flights/flights.component';
import {AirlineRestComponent} from './airline-rest/airline-rest.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    DayComponent,
    WeekComponent,
    MonthComponent,
    YearComponent,
    FlightsComponent,
    FlightsRestComponent,
    HomeComponent,
    PlaneRestComponent,
    ForecastComponent,
    ErrorComponent,
    StatsComponent,
    DepartureComponent,
    AirlineComponent,
    AirlineRestComponent,
    AirportComponent,
    PlaneComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    FontAwesomeModule,
    NgbModule,
    TooltipModule,
    ChartsModule,
  ],
  providers: [DataService,
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: environment.uriGraphQL,
          }),
        };
      },
      deps: [HttpLink],
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
