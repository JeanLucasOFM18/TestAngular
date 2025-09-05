import { Injectable, signal } from '@angular/core';
import { InstrumentConstituent } from '../models/Instrument';

@Injectable({
  providedIn: 'root'
})

export class AppStateService {

  selectedInstrument = signal<InstrumentConstituent | undefined>(undefined);
  selectedPeriod = signal<'1W' | '1M' | '3M' | '6M' | '1Y'>('1W');
  selectedIndex = signal<string>('IPSA');

  setInstrument(instrument: InstrumentConstituent) {
    this.selectedInstrument.set(instrument);
  }

  setPeriod(period: '1W' | '1M' | '3M' | '6M' | '1Y') {
    this.selectedPeriod.set(period);
  }

  setIndex(indexCode: string) {
    this.selectedIndex.set(indexCode);
  }
  
}
