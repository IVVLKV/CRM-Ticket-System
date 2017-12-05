import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsInactiveComponent } from './tickets-inactive.component';

describe('TicketsInactiveComponent', () => {
  let component: TicketsInactiveComponent;
  let fixture: ComponentFixture<TicketsInactiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketsInactiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketsInactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
