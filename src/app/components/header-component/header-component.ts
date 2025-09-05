import { Component, effect } from '@angular/core';
import { SummaryService } from '../../services/summary';
import { AppStateService } from '../../state/app-state';
import { InstrumentConstituent } from '../../models/Instrument';
import { CommonModule } from '@angular/common';
import { Summary } from '../../models/Summary';

@Component({
  selector: 'app-header-component',
  imports: [CommonModule],
  templateUrl: './header-component.html',
  styleUrl: './header-component.css'
})

export class HeaderComponent {

  info?: Summary;

  constructor(private summaryService: SummaryService, private appState: AppStateService) {
    effect(() => {
      const instrument = this.appState.selectedInstrument();
      if (instrument) this.loadSummary(instrument.codeInstrument);
    });
  }

  private loadSummary(code: string) {
    this.summaryService.getSummary(code).subscribe(data => {
      this.info = data;
    });
  }
}
