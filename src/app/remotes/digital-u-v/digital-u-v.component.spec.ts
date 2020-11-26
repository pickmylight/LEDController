import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitalUVComponent } from './digital-u-v.component';

describe('DigitalUVComponent', () => {
  let component: DigitalUVComponent;
  let fixture: ComponentFixture<DigitalUVComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DigitalUVComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DigitalUVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
