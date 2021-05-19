import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AirlineRestComponent} from './airline-rest.component';

describe('AirlineRestComponent', () => {
  let component: AirlineRestComponent;
  let fixture: ComponentFixture<AirlineRestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AirlineRestComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirlineRestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
