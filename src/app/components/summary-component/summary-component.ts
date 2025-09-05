import { Component, effect } from '@angular/core';
import { SummaryService } from '../../services/summary';
import { CommonModule } from '@angular/common';
import { AppStateService } from '../../state/app-state';
import { Summary } from '../../models/Summary';

@Component({
  selector: 'app-summary-component',
  imports: [CommonModule],
  templateUrl: './summary-component.html',
  styleUrl: './summary-component.css'
})
export class SummaryComponent {

  summary?: Summary;

  constructor(private summaryService: SummaryService, private appState: AppStateService) {
    effect(() => {
      const instrument = this.appState.selectedInstrument();
      if (instrument) {
        this.loadSummary(instrument.codeInstrument);
      }
    });
  }

  private loadSummary(code: string) {
    this.summaryService.getSummary(code).subscribe(data => {
      this.summary = data;
    });
  }
}
