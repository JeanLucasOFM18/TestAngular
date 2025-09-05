import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstrumentListComponent } from './instrument-list-component';
import { of } from 'rxjs';
import { DataService } from '../../services/data';
import { AppStateService } from '../../state/app-state';
import { InstrumentConstituent } from '../../models/Instrument';
import { signal } from '@angular/core';

describe('InstrumentListComponent', () => {
  let component: InstrumentListComponent;
  let fixture: ComponentFixture<InstrumentListComponent>;
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
    mockAppState = {
      selectedInstrument: signal<InstrumentConstituent | undefined>(undefined),
      setInstrument: jasmine.createSpy()
    };
    await TestBed.configureTestingModule({
      imports: [InstrumentListComponent],
      providers: [
        { provide: DataService, useValue: mockDataService },
        { provide: AppStateService, useValue: mockAppState }
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstrumentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('crear componente', () => {
    expect(component).toBeTruthy();
  });

  it('cargar instrumentos y dividir en izquierda/derecha', () => {
    expect(mockDataService.getConstituents).toHaveBeenCalled();
    expect(component.instruments.length).toBe(3);
    expect(component.leftInstruments.length).toBe(2); 
    expect(component.rightInstruments.length).toBe(1);
    expect(mockAppState.setInstrument).toHaveBeenCalledWith(mockInstruments[0]);
  });

  it('seleccionar un instrumento', () => {
    const instrument = mockInstruments[2];
    component.selectInstrument(instrument);
    expect(mockAppState.setInstrument).toHaveBeenCalledWith(instrument);
  });
});
