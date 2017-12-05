import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsAddComponent } from './tickets-add.component';

describe('TicketsAddComponent', () => {
  let component: TicketsAddComponent;
  let fixture: ComponentFixture<TicketsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
