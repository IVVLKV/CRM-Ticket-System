import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsActiveComponent } from './tickets-active.component';

describe('TicketsActiveComponent', () => {
  let component: TicketsActiveComponent;
  let fixture: ComponentFixture<TicketsActiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketsActiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketsActiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
