'use client';

import { EquityPoint } from "@/lib/types";
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type EquityChartProps = {
  data: EquityPoint[];
  isLoading: boolean;
};

const tooltipFormatter = (value: number, name: string) => {
  if (name === "Close") {
    return [`$${value.toFixed(2)}`, "Close"];
  }
  if (name === "Equity") {
    return [`$${value.toFixed(2)}`, "Equity"];
  }
  if (name === "Fast MA" || name === "Slow MA") {
    return [`$${value.toFixed(2)}`, name];
  }
  return [value, name];
};

const tooltipLabelFormatter = (label: string) => {
  return new Date(label).toLocaleDateString();
};

export function EquityChart({ data, isLoading }: EquityChartProps) {
  const chartData = data.map((point) => ({
    date: point.date,
    equity: Number(point.equity.toFixed(2)),
    close: Number(point.close.toFixed(2)),
    fast: point.fastMa,
    slow: point.slowMa,
  }));

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Equity & Price
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Visualize how the strategy performed versus the underlying asset.
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="h-72 animate-pulse rounded-xl border border-dashed border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900" />
      ) : chartData.length > 0 ? (
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="date" tickFormatter={(date) => date.slice(5)} />
              <YAxis
                yAxisId="left"
                orientation="left"
                tickFormatter={(value) => `$${value / 1000}k`}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip
                formatter={tooltipFormatter}
                labelFormatter={tooltipLabelFormatter}
              />
              <Legend />
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="equity"
                name="Equity"
                stroke="#2563eb"
                fill="#3b82f6"
                fillOpacity={0.2}
                strokeWidth={2}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="close"
                name="Close"
                stroke="#f97316"
                strokeWidth={2}
                dot={false}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="fast"
                name="Fast MA"
                stroke="#14b8a6"
                strokeWidth={1.5}
                dot={false}
                strokeDasharray="4 2"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="slow"
                name="Slow MA"
                stroke="#a855f7"
                strokeWidth={1.5}
                dot={false}
                strokeDasharray="2 2"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-zinc-200 p-10 text-center text-sm text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
          Run a backtest to see the performance chart.
        </div>
      )}
    </section>
  );
}
