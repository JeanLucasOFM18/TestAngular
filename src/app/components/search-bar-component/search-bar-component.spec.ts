import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBarComponent } from './search-bar-component';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data';
import { AppStateService } from '../../state/app-state';
import { By } from '@angular/platform-browser';
import { InstrumentConstituent } from '../../models/Instrument';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;
  let mockDataService: any;
  let mockAppState: any;

  const mockInstruments: InstrumentConstituent[] = [
    {
      codeInstrument: 'AAA',
      name: 'Instrument A Full',
      shortName: 'Instrument A',
      pctDay: 1.2,
      pct30D: 3.4,
      pctCY: 5.6,
      pct1Y: 7.8,
      lastPrice: 100,
      datetimeLastPrice: '06-11-2024 12:20:10',
      volumeMoney: 1000000,
      accumulatedVolumeMoney: 5000000,
      tend: 'up',
      performanceAbsolute: 10,
      performanceRelative: 5
    },
    {
      codeInstrument: 'BBB',
      name: 'Instrument B Full',
      shortName: 'Instrument B',
      pctDay: -0.5,
      pct30D: 2.1,
      pctCY: 4.2,
      pct1Y: 6.3,
      lastPrice: 200,
      datetimeLastPrice: '06-11-2024 12:20:10',
      volumeMoney: 2000000,
      accumulatedVolumeMoney: 6000000,
      tend: 'down',
      performanceAbsolute: -5,
      performanceRelative: -2
    },
    {
      codeInstrument: 'CCC',
      name: 'Instrument C Full',
      shortName: 'Instrument C',
      pctDay: 0,
      pct30D: -1.2,
      pctCY: 3.3,
      pct1Y: 5.5,
      lastPrice: 300,
      datetimeLastPrice: '06-11-2024 12:20:10',
      volumeMoney: 3000000,
      accumulatedVolumeMoney: 7000000,
      tend: 'same',
      performanceAbsolute: 0,
      performanceRelative: 0
    }
  ];

  beforeEach(async () => {

    mockDataService = { getConstituents: jasmine.createSpy().and.returnValue(of(mockInstruments)) };
    mockAppState = { setInstrument: jasmine.createSpy() };

    await TestBed.configureTestingModule({
      imports: [SearchBarComponent, FormsModule], 
      providers: [
        { provide: DataService, useValue: mockDataService },
        { provide: AppStateService, useValue: mockAppState }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('crear y cargar', () => {
    expect(component).toBeTruthy();
    expect(component.instruments.length).toBe(3);
  });

  it('filtrar sugerencias según la entrada y limpiar cuando está vacío', () => {
    component.term = 'A';
    component.inputChange();
    expect(component.suggestions.length).toBe(1);
    expect(component.suggestions[0].codeInstrument).toBe('AAA');

    component.term = '';
    component.inputChange();
    expect(component.suggestions.length).toBe(0);
  });

  it('seleccionar una sugerencia y actualizar', () => {
    const inst = mockInstruments[1];
    component.selectSuggestion(inst);
    expect(component.term).toBe('BBB');
    expect(component.suggestions.length).toBe(0);
    expect(mockAppState.setInstrument).toHaveBeenCalledWith(inst);
  });

  it('renderizar las sugerencias', () => {
    component.term = 'B';
    component.inputChange();
    fixture.detectChanges();
    const suggestionEls = fixture.debugElement.queryAll(By.css('div.cursor-pointer'));
    expect(suggestionEls.length).toBe(1);
    expect(suggestionEls[0].nativeElement.textContent.trim()).toBe('BBB');
  });
});
