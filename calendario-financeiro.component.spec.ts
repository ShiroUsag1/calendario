import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarioFinanceiroComponent } from './calendario-financeiro.component';

describe('CalendarioFinanceiroComponent', () => {
  let component: CalendarioFinanceiroComponent;
  let fixture: ComponentFixture<CalendarioFinanceiroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarioFinanceiroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CalendarioFinanceiroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
