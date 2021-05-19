import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AirportRestComponent} from './airport-rest.component';

describe('AirportRestComponent', () => {
  let component: AirportRestComponent;
  let fixture: ComponentFixture<AirportRestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AirportRestComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirportRestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
