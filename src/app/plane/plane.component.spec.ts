import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaneComponent } from './plane.component';

describe('PlaneComponent', () => {
  let component: PlaneComponent;
  let fixture: ComponentFixture<PlaneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlaneComponent]
    });
    fixture = TestBed.createComponent(PlaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
