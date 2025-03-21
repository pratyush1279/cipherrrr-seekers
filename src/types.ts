export interface Transaction {
  id: string;
  payerId: string;
  payeeId: string;
  amount: number;
  timestamp: string;
  channel: string;
  paymentMode: string;
  gateway: string;
  bank: string;
  predictedFraud: boolean;
  reportedFraud: boolean;
}

export interface MetricsData {
  truePositives: number;
  trueNegatives: number;
  falsePositives: number;
  falseNegatives: number;
}

export interface ChartData {
  labels: string[];
  predicted: number[];
  reported: number[];
}

export interface TimeSeriesData {
  timestamps: string[];
  predicted: number[];
  reported: number[];
}

export interface DashboardProps {
  transactions: Transaction[];
  metrics: MetricsData;
  channelData: ChartData;
  paymentModeData: ChartData;
  gatewayData: ChartData;
  bankData: ChartData;
  timeSeriesData: TimeSeriesData;
}

export interface SummaryMetrics {
  predictedFraudsToday: number;
  detectionRate: number;
  totalTransactions: number;
}