import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PlaneRestComponent} from './plane-rest.component';

describe('PlaneRestComponent', () => {
  let component: PlaneRestComponent;
  let fixture: ComponentFixture<PlaneRestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PlaneRestComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaneRestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
