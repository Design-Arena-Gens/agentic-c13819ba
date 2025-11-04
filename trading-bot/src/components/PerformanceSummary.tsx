import { BacktestResult } from "@/lib/types";

type PerformanceSummaryProps = {
  result: BacktestResult | null;
  isLoading: boolean;
};

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function formatPercent(value: number) {
  return `${value > 0 ? "+" : ""}${value.toFixed(2)}%`;
}

export function PerformanceSummary({ result, isLoading }: PerformanceSummaryProps) {
  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Performance
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {result
              ? `${result.startDate} → ${result.endDate}`
              : "Run the backtest to see performance metrics"}
          </p>
        </div>
        {result && (
          <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium uppercase tracking-wide text-zinc-500 dark:bg-zinc-800 dark:text-zinc-300">
            {result.symbol}
          </span>
        )}
      </div>

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div
              key={idx}
              className="animate-pulse rounded-xl border border-zinc-200 bg-zinc-100 p-4 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="mb-3 h-4 w-20 rounded bg-zinc-200 dark:bg-zinc-800" />
              <div className="h-6 w-32 rounded bg-zinc-300 dark:bg-zinc-700" />
            </div>
          ))}
        </div>
      ) : result ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <MetricCard label="Total Return" value={formatPercent(result.totalReturnPct)} />
          <MetricCard
            label="Annualized"
            value={formatPercent(result.annualizedReturnPct)}
          />
          <MetricCard label="Win Rate" value={formatPercent(result.winRatePct)} />
          <MetricCard
            label="Max Drawdown"
            value={formatPercent(-result.maxDrawdownPct)}
            intent="danger"
          />
          <MetricCard
            label="Profit Factor"
            value={Number.isFinite(result.profitFactor) ? result.profitFactor.toFixed(2) : "∞"}
          />
          <MetricCard
            label="Average Trade"
            value={formatPercent(result.averageTradePct)}
          />
          <MetricCard
            label="Ending Equity"
            value={currencyFormatter.format(result.compoundedEquity)}
            wide
          />
          <MetricCard
            label="# of Trades"
            value={`${result.trades.length}`}
            wide
          />
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-zinc-200 p-10 text-center text-sm text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
          Configure a strategy and run a backtest to populate this dashboard.
        </div>
      )}
    </section>
  );
}

type MetricCardProps = {
  label: string;
  value: string;
  intent?: "neutral" | "danger";
  wide?: boolean;
};

function MetricCard({
  label,
  value,
  intent = "neutral",
  wide = false,
}: MetricCardProps) {
  return (
    <div
      className={`rounded-xl border border-zinc-200 p-4 shadow-sm dark:border-zinc-800 ${
        wide ? "sm:col-span-2 lg:col-span-3" : ""
      }`}
    >
      <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
        {label}
      </p>
      <p
        className={`mt-2 text-2xl font-semibold ${
          intent === "danger"
            ? "text-red-600 dark:text-red-400"
            : "text-zinc-900 dark:text-zinc-100"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
