import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FlightsGraphqlComponent} from './flights-graphql.component';


describe('FlightsGraphqlComponent', () => {
  let component: FlightsGraphqlComponent;
  let fixture: ComponentFixture<FlightsGraphqlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightsGraphqlComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightsGraphqlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
