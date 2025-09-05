import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryComponent } from './summary-component';
import { of } from 'rxjs';
import { SummaryService } from '../../services/summary';
import { AppStateService } from '../../state/app-state';
import { By } from '@angular/platform-browser';
import { Summary } from '../../models/Summary';

describe('SummaryComponent', () => {
  let component: SummaryComponent;
  let fixture: ComponentFixture<SummaryComponent>;
  let mockSummaryService: any;
  let mockAppState: any;

  const mockSummary = {
    data: {
      info: { marketName: 'IPSA' },
      price: {
        openPrice: 100,
        closePrice: 95,
        maxDay: 105,
        minDay: 90,
        max52W: 120,
        min52W: 80,
        pct30D: 2.5,
        pctRelW52: -1.2,
        pctRelCY: 0
      }
    }
  };

  beforeEach(async () => {
    mockSummaryService = { getSummary: jasmine.createSpy().and.returnValue(of(mockSummary)) };
    mockAppState = { selectedInstrument: jasmine.createSpy().and.returnValue({ codeInstrument: 'AAA' }) };
    await TestBed.configureTestingModule({
      imports: [SummaryComponent],
       providers: [
        { provide: SummaryService, useValue: mockSummaryService },
        { provide: AppStateService, useValue: mockAppState }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('cargar los datos al iniciar', () => {
    const spy = mockSummaryService.getSummary;
    expect(spy).toHaveBeenCalled();
    spy.calls.mostRecent().returnValue.subscribe((data: Summary) => {
      expect(component.summary).toEqual(data);
    });
  });

  it('renderizado de datos en el html', () => {
    fixture.detectChanges();
    const marketEl = fixture.debugElement.query(By.css('p:nth-of-type(1) span:nth-child(2)')).nativeElement;
    const openPriceEl = fixture.debugElement.query(By.css('p:nth-of-type(2) span:nth-child(2)')).nativeElement;

    expect(marketEl.textContent).toBe('IPSA');
    expect(openPriceEl.textContent).toBe('100.00');
  });

  it('Color según situación', () => {
    fixture.detectChanges();
    const pct30DEl = fixture.debugElement.query(By.css('p:nth-of-type(9)'));
    const pctRelW52El = fixture.debugElement.query(By.css('p:nth-of-type(10)'));
    const pctRelCYEl = fixture.debugElement.query(By.css('p:nth-of-type(11)'));

    expect(pct30DEl.nativeElement.classList).toContain('text-green-500');
    expect(pctRelW52El.nativeElement.classList).toContain('text-red-500');
    expect(pctRelCYEl.nativeElement.classList).toContain('text-gray-500');
  });
});
