import { Component, effect, OnInit, signal } from '@angular/core';
import { AppStateService } from './state/app-state';
import { Instrument, InstrumentConstituent } from './models/Instrument';
import { SearchBarComponent } from "./components/search-bar-component/search-bar-component";
import { DataService } from './services/data';
import { ChartComponent } from './components/chart-component/chart-component';
import { SummaryComponent } from "./components/summary-component/summary-component";
import { HeaderComponent } from "./components/header-component/header-component";
import { TabComponent } from "./components/tab-component/tab-component";
import { InstrumentListComponent } from "./components/instrument-list-component/instrument-list-component";

@Component({
  selector: 'app-root',
  imports: [SearchBarComponent, ChartComponent, SummaryComponent, HeaderComponent, TabComponent, InstrumentListComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App implements OnInit {

  instruments: InstrumentConstituent[] = [];
  protected readonly title = signal('prueba-angular');

  constructor( public appState: AppStateService, private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getInstruments().subscribe((data: Instrument[]) => {
      if (!data || !data.length) return;
      this.instruments = data[0].data.constituents;
      const firstConstituent = this.instruments[0];
      if (firstConstituent) {
        this.appState.setInstrument(firstConstituent);
      }
    });
  }
}
