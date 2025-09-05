import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header-component';
import { of } from 'rxjs';
import { SummaryService } from '../../services/summary';
import { AppStateService } from '../../state/app-state';
import { By } from '@angular/platform-browser';
import { Summary } from '../../models/Summary';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let mockSummaryService: any;
  let mockAppState: any;

  const mockInstrument = { codeInstrument: 'AAA', shortName: 'Instrument A', name: 'Instrument A Full' };

  const mockSummary = {
    data: {
      info: { name: 'Instrument A', countryName: 'Chile' },
      price: { lastPrice: 123.45, tend: 'up' }
    }
  };

  beforeEach(async () => {

    mockSummaryService = { getSummary: jasmine.createSpy().and.returnValue(of(mockSummary)) };
    mockAppState = { selectedInstrument: jasmine.createSpy().and.returnValue(mockInstrument) };

    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [
        { provide: SummaryService, useValue: mockSummaryService },
        { provide: AppStateService, useValue: mockAppState }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('crear componente', () => {
    expect(component).toBeTruthy();
  });

  it('cargar datos de resumen y llamar al servicio', () => {
    const spy = mockSummaryService.getSummary;
    expect(spy).toHaveBeenCalled();
    spy.calls.mostRecent().returnValue.subscribe((data: Summary) => {
      expect(component.info).toEqual(data);
    });
  });

  it('renderizar nombre, país, tendencia y último precio', () => {
    const h2El = fixture.debugElement.query(By.css('h2')).nativeElement;
    expect(h2El.textContent.trim()).toBe('Instrument A, CHILE');

    const pEl = fixture.debugElement.query(By.css('p')).nativeElement;
    expect(pEl.textContent).toContain('↑ 123.45');
  });
});
