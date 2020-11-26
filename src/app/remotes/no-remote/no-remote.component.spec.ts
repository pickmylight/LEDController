import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoRemoteComponent } from './no-remote.component';

describe('NoRemoteComponent', () => {
  let component: NoRemoteComponent;
  let fixture: ComponentFixture<NoRemoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoRemoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoRemoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
