import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FlightsRestComponent} from './flights-rest.component';

describe('FlightsComponent', () => {
  let component: FlightsRestComponent;
  let fixture: ComponentFixture<FlightsRestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightsRestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightsRestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
