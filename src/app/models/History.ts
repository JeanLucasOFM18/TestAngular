export interface HistoryInfo {
  name: string;
  shortName: string;
  countryName: string;
  currencyName: string;
  currencySymbol: string;
  codeInstrument: string;
  hourOpen: string;
  hourClose: string;
}

export interface HistoryChartEntry {
  datetimeLastPrice: string;
  datetimeLastPriceTs: number;
  lastPrice: number;
  highPrice: number;
  lowPrice: number;
  openPrice: number;
  closePrice: number;
  volume: number;
  volumeMoney: number;
  performanceRelative: number;
  performanceAbsolute: number;
  tend: string;
}

export interface History {
  success: boolean;
  code: number;
  data: {
    info: HistoryInfo;
    chart: HistoryChartEntry[];
  }
}