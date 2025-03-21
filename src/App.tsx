import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { TransactionTable } from './components/TransactionTable';
import { DimensionCharts } from './components/DimensionCharts';
import { TimeSeriesChart } from './components/TimeSeriesChart';
import { ConfusionMatrix } from './components/ConfusionMatrix';
import { AlertTriangle, TrendingUp, Activity } from 'lucide-react';
import type { DashboardProps, SummaryMetrics } from './types';

interface AppProps {
  data: DashboardProps;
  summaryMetrics: SummaryMetrics;
}

function App({ data, summaryMetrics }: AppProps) {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    new Date(),
  ]);
  const [startDate, endDate] = dateRange;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Fraud Detection Dashboard
          </h1>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Summary Cards */}
        <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg bg-white p-6 shadow">
            <div className="flex items-center">
              <div className="rounded-full bg-red-100 p-3">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">
                  Predicted Frauds Today
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {summaryMetrics.predictedFraudsToday}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow">
            <div className="flex items-center">
              <div className="rounded-full bg-blue-100 p-3">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">
                  Detection Rate
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {summaryMetrics.detectionRate.toFixed(1)}%
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow">
            <div className="flex items-center">
              <div className="rounded-full bg-green-100 p-3">
                <Activity className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">
                  Total Transactions
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {summaryMetrics.totalTransactions.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Date Range Picker */}
        <div className="mb-6">
          <DatePicker
            selectsRange={true}
            startDate={startDate}
            endDate={endDate}
            onChange={update => {
              setDateRange(update);
            }}
            className="rounded-md border border-gray-300 px-4 py-2"
            placeholderText="Select date range"
          />
        </div>

        {/* Time Series Chart */}
        <div className="mb-6">
          <TimeSeriesChart
            data={data.timeSeriesData}
            title="Fraud Detection Trends"
          />
        </div>

        {/* Dimension Charts */}
        <div className="mb-6">
          <DimensionCharts
            channelData={data.channelData}
            paymentModeData={data.paymentModeData}
            gatewayData={data.gatewayData}
            bankData={data.bankData}
          />
        </div>

        {/* Evaluation Metrics */}
        <div className="mb-6">
          <ConfusionMatrix metrics={data.metrics} />
        </div>

        {/* Transaction Table */}
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-semibold">Transaction History</h2>
          <TransactionTable data={data.transactions} />
        </div>
      </main>
    </div>
  );
}

export default App;