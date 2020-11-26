import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitalSimpleComponent } from './digital-simple.component';

describe('DigitalSimpleComponent', () => {
  let component: DigitalSimpleComponent;
  let fixture: ComponentFixture<DigitalSimpleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DigitalSimpleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DigitalSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
