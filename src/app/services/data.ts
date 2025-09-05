import { Injectable } from '@angular/core';
import { from, Observable} from 'rxjs';
import { Instrument, InstrumentConstituent } from '../models/Instrument';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  getConstituents(): Observable<InstrumentConstituent[]> {
    return from(import('../../assets/constituyentes/constituensList.json').then(m => m.default.data.constituents as InstrumentConstituent[]));
  }

  getInstruments(): Observable<Instrument[]> {
    return from(import('../../assets/constituyentes/constituensList.json').then(m => [m.default] as Instrument[]));
  }
  
}
