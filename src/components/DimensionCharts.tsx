import React from 'react';
import { FraudMetrics } from './FraudMetrics';
import type { ChartData } from '../types';

interface DimensionChartsProps {
  channelData: ChartData;
  paymentModeData: ChartData;
  gatewayData: ChartData;
  bankData: ChartData;
}

export const DimensionCharts: React.FC<DimensionChartsProps> = ({
  channelData,
  paymentModeData,
  gatewayData,
  bankData,
}) => {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <FraudMetrics data={channelData} title="Fraud by Transaction Channel" />
      <FraudMetrics data={paymentModeData} title="Fraud by Payment Mode" />
      <FraudMetrics data={gatewayData} title="Fraud by Payment Gateway" />
      <FraudMetrics data={bankData} title="Fraud by Bank" />
    </div>
  );
};