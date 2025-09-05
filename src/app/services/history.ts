import { Injectable } from '@angular/core';
import { History} from '../models/History';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class HistoryService {

  constructor() { }

  getHistory(code: string): Observable<History> {
    return from(import(`../../assets/history/history-${code}.json`).then(m => m.default));
  }
}
