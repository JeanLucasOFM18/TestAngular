import { CommonModule } from '@angular/common';
import { Component, effect, signal } from '@angular/core';
import { AppStateService } from '../../state/app-state';

@Component({
  selector: 'app-tab-component',
  imports: [CommonModule],
  templateUrl: './tab-component.html',
  styleUrl: './tab-component.css'
})

export class TabComponent {

  indices = [
    { codeInstrument: 'IPSA', name: 'IPSA' },
    { codeInstrument: 'IGPA', name: 'IGPA' },
    { codeInstrument: 'NASDAQ', name: 'NASDAQ' },
    { codeInstrument: 'DOWJONES', name: 'DOW JONES' },
    { codeInstrument: 'SP', name: 'SP/BVL' },
  ];

  activeIndex = signal(this.indices[0]);

  constructor(private appState: AppStateService) {
    effect(() => {
      const index = this.activeIndex();
      if (index) {
        this.appState.setIndex(index.codeInstrument);
      }
    });
  }

  selectIndex(index: { codeInstrument: string; name: string }) {
    this.activeIndex.set(index);
  }

}