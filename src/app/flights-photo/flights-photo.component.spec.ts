import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FlightsPhotoComponent} from './flights-photo.component';

describe('FlightsPhotoComponent', () => {
  let component: FlightsPhotoComponent;
  let fixture: ComponentFixture<FlightsPhotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlightsPhotoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightsPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
