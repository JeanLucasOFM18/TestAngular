import { Component, effect } from '@angular/core';
import { HistoryService } from '../../services/history';
import { ChartModule } from 'primeng/chart';
import { HistoryChartEntry, HistoryInfo } from '../../models/History';
import { CommonModule } from '@angular/common';
import { AppStateService } from '../../state/app-state';

@Component({
  selector: 'app-chart-component',
  imports: [ChartModule, CommonModule],
  templateUrl: './chart-component.html',
  styleUrl: './chart-component.css'
})

export class ChartComponent {

  data: any = { labels: [], datasets: [] };
  options: any = {};
  chartData: HistoryChartEntry[] = [];
  chartInfo?: HistoryInfo;
  periods: ('1W' | '1M' | '3M' | '6M' | '1Y')[] = ['1W', '1M', '3M', '6M', '1Y'];

  constructor(public appState: AppStateService, private historyService: HistoryService) {
    effect(() => {
      const instrument = this.appState.selectedInstrument();
      const period = this.appState.selectedPeriod();
      if (instrument) {
        this.loadHistory(instrument.codeInstrument, period);
      }
    });
  }

  async loadHistory(code: string, period: '1W' | '1M' | '3M' | '6M' | '1Y') {
    try {
      this.historyService.getHistory(code).subscribe(response => {
      this.chartData = response.data.chart;
      this.chartInfo = response.data.info;
      this.updateChart(period);
    });
    } catch (error) {
      console.error('Error cargando historial:', error);
    }
  }

  updateChart(period: '1W' | '1M' | '3M' | '6M' | '1Y') {
    if (!this.chartData.length) return;
    const filteredData = this.filterChartByPeriod(this.chartData, period);
    if (!filteredData.length) return;
    const prices = filteredData.map(c => c.lastPrice);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    this.data = {
      labels: filteredData.map(c => c.datetimeLastPrice),
      datasets: [
        {
          label: 'Precio',
          data: filteredData.map(c => c.lastPrice),
          fill: true,
          borderColor: '#00FFFF',
          tension: 0.4,
          backgroundColor: 'rgba(0, 255, 255, 0.3)',
        },
      ],
    };

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      scales: {
        y: { min: minPrice, max: maxPrice, ticks: { color: '#fff' }, grid: { color: '#333' } },
        x: { ticks: { color: '#fff', autoSkip: true, maxTicksLimit: 5 }, grid: { color: '#333' } },
      },
      plugins: { legend: { labels: { color: '#fff' } } },
    };
  }

  parseDate(dateStr: string): Date {
    const [d, m, y] = dateStr.split(' ')[0].split('-').map(Number);
    const [h, min, s] = dateStr.split(' ')[1].split(':').map(Number);
    return new Date(y, m - 1, d, h, min, s);
  }

  filterChartByPeriod(chartData: HistoryChartEntry[], period: '1W' | '1M' | '3M' | '6M' | '1Y') {
    if (!chartData.length) return [];
    const lastDate = this.parseDate(chartData[chartData.length - 1].datetimeLastPrice);
    let fromDate: Date;
    switch (period) {
      case '1W': fromDate = new Date(lastDate.getTime() - 7 * 24 * 60 * 60 * 1000); break;
      case '1M': fromDate = new Date(lastDate.getTime() - 30 * 24 * 60 * 60 * 1000); break;
      case '3M': fromDate = new Date(lastDate.getTime() - 90 * 24 * 60 * 60 * 1000); break;
      case '6M': fromDate = new Date(lastDate.getTime() - 180 * 24 * 60 * 60 * 1000); break;
      case '1Y': fromDate = new Date(lastDate.getTime() - 365 * 24 * 60 * 60 * 1000); break;
      default: fromDate = new Date(0);
    }
    return chartData.filter(c => {
      const d = this.parseDate(c.datetimeLastPrice);
      return d >= fromDate && d <= lastDate;
    });
  }
}