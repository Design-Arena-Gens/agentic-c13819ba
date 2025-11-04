'use client';

import { EquityChart } from "@/components/EquityChart";
import { PerformanceSummary } from "@/components/PerformanceSummary";
import { StrategyForm } from "@/components/StrategyForm";
import { TradesTable } from "@/components/TradesTable";
import { normalizeConfig } from "@/lib/strategy";
import { BacktestResult, StrategyConfig } from "@/lib/types";
import { useCallback, useEffect, useState } from "react";

const DEFAULT_CONFIG = normalizeConfig({
  symbol: "AAPL",
  fastLength: 10,
  slowLength: 30,
  initialCapital: 100_000,
  feeBps: 5,
  slippageBps: 5,
});

export default function Home() {
  const [config, setConfig] = useState<StrategyConfig>(DEFAULT_CONFIG);
  const [result, setResult] = useState<BacktestResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runBacktest = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/backtest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(config),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        throw new Error(payload.error ?? "Backtest failed");
      }

      const payload = (await response.json()) as { data: BacktestResult };
      setResult(payload.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setIsLoading(false);
    }
  }, [config]);

  useEffect(() => {
    runBacktest().catch((err) => {
      console.error(err);
    });
  }, [runBacktest]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-100 pb-20 pt-12 dark:from-black dark:via-zinc-950 dark:to-black">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6">
        <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2rem] text-zinc-500 dark:text-zinc-500">
              Agentic Alpha
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-zinc-900 dark:text-zinc-50 sm:text-4xl">
              Moving-Average Trading Bot
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">
              Deploy a systematic trend-following strategy with live market data,
              parameter exploration, and full trade attribution.
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
            <span className="inline-flex items-center gap-2 rounded-full border border-zinc-200 px-3 py-2 dark:border-zinc-700">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Live Market Data
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-zinc-200 px-3 py-2 dark:border-zinc-700">
              <span className="h-2 w-2 rounded-full bg-blue-500" />
              Backtester v1.0
            </span>
          </div>
        </header>

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-200">
            {error}
          </div>
        )}

        <StrategyForm
          config={config}
          onChange={(nextConfig) => setConfig(normalizeConfig(nextConfig))}
          onSubmit={runBacktest}
          isLoading={isLoading}
        />

        <PerformanceSummary result={result} isLoading={isLoading} />

        <EquityChart data={result?.equityCurve ?? []} isLoading={isLoading} />

        <TradesTable trades={result?.trades ?? []} isLoading={isLoading} />
      </div>
    </main>
  );
}
