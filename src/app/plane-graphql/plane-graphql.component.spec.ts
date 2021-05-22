import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PlaneGraphqlComponent} from './plane-graphql.component';

describe('AirlineComponent', () => {
  let component: PlaneGraphqlComponent;
  let fixture: ComponentFixture<PlaneGraphqlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PlaneGraphqlComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaneGraphqlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
