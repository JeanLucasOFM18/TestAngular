import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { Summary } from '../models/Summary';

@Injectable({
  providedIn: 'root'
})
export class SummaryService {

  constructor() { }

  getSummary(code: string): Observable<Summary> {
    return from(import(`../../assets/resumen/${code}.json`).then(m => m.default));
  }
  
}
