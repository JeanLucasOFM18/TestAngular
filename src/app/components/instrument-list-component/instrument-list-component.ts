import { Component, OnInit } from '@angular/core';
import { InstrumentConstituent } from '../../models/Instrument';
import { DataService } from '../../services/data';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { AppStateService } from '../../state/app-state';

@Component({
  selector: 'app-instrument-list-component',
  imports: [TableModule, CommonModule],
  templateUrl: './instrument-list-component.html',
  styleUrl: './instrument-list-component.css'
})

export class InstrumentListComponent implements OnInit {

  instruments: InstrumentConstituent[] = [];
  leftInstruments: InstrumentConstituent[] = [];
  rightInstruments: InstrumentConstituent[] = [];

  constructor(private dataService: DataService, public appState: AppStateService) { }

  ngOnInit(): void {
    this.dataService.getConstituents().subscribe(data => {
      this.instruments = data;
      const mid = Math.ceil(this.instruments.length / 2);
      this.leftInstruments = this.instruments.slice(0, mid);
      this.rightInstruments = this.instruments.slice(mid);
      const first = this.instruments[0];
      if (first) this.appState.setInstrument(first);
    });
  }

  selectInstrument(inst: InstrumentConstituent) {
    this.appState.setInstrument(inst);
  }
}
