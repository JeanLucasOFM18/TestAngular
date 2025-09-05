import { Component, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { InstrumentConstituent } from '../../models/Instrument';
import { DataService } from '../../services/data';
import { CommonModule } from '@angular/common';
import { AppStateService } from '../../state/app-state';

@Component({
  selector: 'app-search-bar-component',
  imports: [FormsModule, InputTextModule, FloatLabel, CommonModule],
  templateUrl: './search-bar-component.html',
  styleUrl: './search-bar-component.css'
})

export class SearchBarComponent implements OnInit {

  term: string = '';
  instruments: InstrumentConstituent[] = [];
  suggestions: InstrumentConstituent[] = [];

  constructor(private dataService: DataService, private appState: AppStateService) { }

  ngOnInit(): void {
    this.dataService.getConstituents().subscribe(data => {
      this.instruments = data;
    });
  }

  inputChange(): void {
    const query = this.term.toLowerCase();
    if (!query){ 
      this.suggestions = []; 
      return; 
    }
    this.suggestions = this.instruments.filter((i) => i.codeInstrument.toLowerCase().includes(query));
  }

  selectSuggestion(inst: InstrumentConstituent) {
    this.term = inst.codeInstrument;
    this.suggestions = [];
    this.appState.setInstrument(inst);
  }

}
