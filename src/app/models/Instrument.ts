export interface InstrumentConstituent {
    codeInstrument: string,
    name: string,
    shortName: string,
    pctDay: number,
    pct30D: number,
    pctCY: number,
    pct1Y: number,
    lastPrice: number,
    datetimeLastPrice: string,
    volumeMoney: number,
    accumulatedVolumeMoney: number,
    tend: 'up' | 'down' | 'same',
    performanceAbsolute: number,
    performanceRelative: number
}

export interface InstrumentInfo {
    name: string,
    shortName: string,
    countryName: string,
    codeInstrument: string
}

export interface Instrument {
    success: boolean,
    code: number,
    data: {
        info: InstrumentInfo;
        constituents: InstrumentConstituent[];
    }
}