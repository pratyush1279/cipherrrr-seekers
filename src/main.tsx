import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// This is a placeholder for the actual data that should come from your API
const emptyDashboardData = {
  transactions: [],
  metrics: {
    truePositives: 0,
    trueNegatives: 0,
    falsePositives: 0,
    falseNegatives: 0,
  },
  channelData: {
    labels: [],
    predicted: [],
    reported: [],
  },
  paymentModeData: {
    labels: [],
    predicted: [],
    reported: [],
  },
  gatewayData: {
    labels: [],
    predicted: [],
    reported: [],
  },
  bankData: {
    labels: [],
    predicted: [],
    reported: [],
  },
  timeSeriesData: {
    timestamps: [],
    predicted: [],
    reported: [],
  },
};

const emptySummaryMetrics = {
  predictedFraudsToday: 0,
  detectionRate: 0,
  totalTransactions: 0,
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App data={emptyDashboardData} summaryMetrics={emptySummaryMetrics} />
  </StrictMode>
);