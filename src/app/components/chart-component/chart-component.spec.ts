import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChartComponent } from './chart-component';
import { HistoryService } from '../../services/history';
import { AppStateService } from '../../state/app-state';
import { By } from '@angular/platform-browser';
import { History } from '../../models/History';
import { of } from 'rxjs';

describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;

  let mockHistoryService: any;
  let mockAppState: any;

  const mockInstrument = { codeInstrument: 'AAA', shortName: 'Instrument A', name: 'Instrument A Full' };

  const mockHistory: History = {
    success: true,
    code: 200,
    data: {
      info: {
        name: 'Instrument A',
        shortName: 'Instr A',
        countryName: 'Chile',
        currencyName: 'Peso',
        currencySymbol: '$',
        codeInstrument: 'AAA',
        hourOpen: '09:00',
        hourClose: '16:00'
      },
      chart: [
        {
          datetimeLastPrice: '01-09-2025 10:00:00',
          datetimeLastPriceTs: 1693552800000,
          lastPrice: 100,
          highPrice: 102,
          lowPrice: 98,
          openPrice: 99,
          closePrice: 101,
          volume: 1000,
          volumeMoney: 100000,
          performanceRelative: 1,
          performanceAbsolute: 1,
          tend: 'up'
        },
        {
          datetimeLastPrice: '02-09-2025 10:00:00',
          datetimeLastPriceTs: 1693639200000,
          lastPrice: 110,
          highPrice: 112,
          lowPrice: 108,
          openPrice: 109,
          closePrice: 111,
          volume: 2000,
          volumeMoney: 200000,
          performanceRelative: 2,
          performanceAbsolute: 2,
          tend: 'up'
        }
      ]
    }
  };

  beforeEach(async () => {
    mockHistoryService = { 
      getHistory: jasmine.createSpy().and.returnValue(of(mockHistory)) 
    };
    mockAppState = { 
      selectedInstrument: jasmine.createSpy().and.returnValue(mockInstrument),
      setPeriod: jasmine.createSpy(),
      selectedPeriod: jasmine.createSpy().and.returnValue('1W')
    };
    await TestBed.configureTestingModule({
      imports: [ChartComponent],
      providers: [
        { provide: HistoryService, useValue: mockHistoryService },
        { provide: AppStateService, useValue: mockAppState }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('crear componente', () => {
    expect(component).toBeTruthy();
  });

  it('cargar datos de historial y actualizar gráfico', async () => {
    await component.loadHistory('AAA', '1W');
    fixture.detectChanges();

    expect(mockHistoryService.getHistory).toHaveBeenCalledWith('AAA');
    expect(component.chartData.length).toBe(2);
    expect(component.data.datasets[0].data).toEqual([100, 110]);
  });

  it('renderizar botones de período y manejar clic', () => {
    const buttons = fixture.debugElement.queryAll(By.css('button'));
    expect(buttons.length).toBe(component.periods.length);
    buttons[1].nativeElement.click();
    expect(mockAppState.setPeriod).toHaveBeenCalledWith(component.periods[1]);
  });
});
