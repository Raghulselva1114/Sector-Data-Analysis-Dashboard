export type SectorDataKey = keyof typeof import('../data/sectorData').default;

export interface SectorStats {
  mean: number;
  median: number;
  min: number;
  max: number;
  range: number;
  standardDeviation: number;
  count: number;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
  }[];
}

export type ChartType = 'bar' | 'line' | 'scatter' | 'boxplot';