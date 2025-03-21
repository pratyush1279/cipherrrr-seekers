import React from 'react';
import type { MetricsData } from '../types';

interface ConfusionMatrixProps {
  metrics: MetricsData;
}

export const ConfusionMatrix: React.FC<ConfusionMatrixProps> = ({ metrics }) => {
  const total =
    metrics.truePositives +
    metrics.trueNegatives +
    metrics.falsePositives +
    metrics.falseNegatives;

  const precision =
    metrics.truePositives / (metrics.truePositives + metrics.falsePositives);
  const recall =
    metrics.truePositives / (metrics.truePositives + metrics.falseNegatives);

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <h3 className="mb-4 text-xl font-semibold">Model Evaluation Metrics</h3>
      
      <div className="mb-6 grid grid-cols-2 gap-4">
        <div className="rounded-lg bg-green-50 p-4">
          <h4 className="mb-2 font-medium text-green-800">Precision</h4>
          <p className="text-2xl font-bold text-green-600">
            {(precision * 100).toFixed(2)}%
          </p>
        </div>
        
        <div className="rounded-lg bg-blue-50 p-4">
          <h4 className="mb-2 font-medium text-blue-800">Recall</h4>
          <p className="text-2xl font-bold text-blue-600">
            {(recall * 100).toFixed(2)}%
          </p>
        </div>
      </div>

      <h4 className="mb-3 font-medium">Confusion Matrix</h4>
      <div className="grid grid-cols-2 gap-2">
        <div className="rounded bg-green-100 p-4 text-center">
          <p className="text-sm text-green-800">True Positives</p>
          <p className="text-xl font-bold text-green-900">
            {metrics.truePositives}
          </p>
        </div>
        <div className="rounded bg-red-100 p-4 text-center">
          <p className="text-sm text-red-800">False Positives</p>
          <p className="text-xl font-bold text-red-900">
            {metrics.falsePositives}
          </p>
        </div>
        <div className="rounded bg-red-100 p-4 text-center">
          <p className="text-sm text-red-800">False Negatives</p>
          <p className="text-xl font-bold text-red-900">
            {metrics.falseNegatives}
          </p>
        </div>
        <div className="rounded bg-green-100 p-4 text-center">
          <p className="text-sm text-green-800">True Negatives</p>
          <p className="text-xl font-bold text-green-900">
            {metrics.trueNegatives}
          </p>
        </div>
      </div>
    </div>
  );
};