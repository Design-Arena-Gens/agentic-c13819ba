'use client';

import { StrategyConfig } from "@/lib/types";

type StrategyFormProps = {
  config: StrategyConfig;
  onChange: (config: StrategyConfig) => void;
  onSubmit: () => void;
  isLoading: boolean;
};

export function StrategyForm({
  config,
  onChange,
  onSubmit,
  isLoading,
}: StrategyFormProps) {
  const update = (partial: Partial<StrategyConfig>) => {
    onChange({ ...config, ...partial });
  };

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Strategy Parameters
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Configure the moving-average crossover system and run a fresh
            backtest.
          </p>
        </div>
        <button
          type="button"
          onClick={onSubmit}
          disabled={isLoading}
          className="inline-flex items-center justify-center rounded-full bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-400 disabled:cursor-not-allowed disabled:bg-zinc-400 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
        >
          {isLoading ? "Running…" : "Run Backtest"}
        </button>
      </div>

      <div className="grid gap-4 text-sm sm:grid-cols-2 lg:grid-cols-3">
        <label className="flex flex-col gap-2 text-zinc-600 dark:text-zinc-300">
          <span className="font-medium text-zinc-800 dark:text-zinc-100">
            Symbol
          </span>
          <input
            value={config.symbol}
            onChange={(event) => update({ symbol: event.target.value })}
            className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-zinc-900 shadow-sm transition focus:border-black focus:outline-none focus:ring-2 focus:ring-zinc-300 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:focus:border-zinc-200 dark:focus:ring-zinc-700"
            placeholder="AAPL"
          />
        </label>

        <label className="flex flex-col gap-2 text-zinc-600 dark:text-zinc-300">
          <span className="font-medium text-zinc-800 dark:text-zinc-100">
            Fast MA Length
          </span>
          <input
            type="number"
            min={2}
            max={200}
            value={config.fastLength}
            onChange={(event) =>
              update({ fastLength: Number.parseInt(event.target.value, 10) })
            }
            className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-zinc-900 shadow-sm transition focus:border-black focus:outline-none focus:ring-2 focus:ring-zinc-300 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:focus:border-zinc-200 dark:focus:ring-zinc-700"
            placeholder="10"
          />
        </label>

        <label className="flex flex-col gap-2 text-zinc-600 dark:text-zinc-300">
          <span className="font-medium text-zinc-800 dark:text-zinc-100">
            Slow MA Length
          </span>
          <input
            type="number"
            min={3}
            max={400}
            value={config.slowLength}
            onChange={(event) =>
              update({ slowLength: Number.parseInt(event.target.value, 10) })
            }
            className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-zinc-900 shadow-sm transition focus:border-black focus:outline-none focus:ring-2 focus:ring-zinc-300 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:focus:border-zinc-200 dark:focus:ring-zinc-700"
            placeholder="30"
          />
        </label>

        <label className="flex flex-col gap-2 text-zinc-600 dark:text-zinc-300">
          <span className="font-medium text-zinc-800 dark:text-zinc-100">
            Initial Capital ($)
          </span>
          <input
            type="number"
            min={1000}
            step={1000}
            value={config.initialCapital}
            onChange={(event) =>
              update({ initialCapital: Number.parseInt(event.target.value, 10) })
            }
            className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-zinc-900 shadow-sm transition focus:border-black focus:outline-none focus:ring-2 focus:ring-zinc-300 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:focus:border-zinc-200 dark:focus:ring-zinc-700"
            placeholder="100000"
          />
        </label>

        <label className="flex flex-col gap-2 text-zinc-600 dark:text-zinc-300">
          <span className="font-medium text-zinc-800 dark:text-zinc-100">
            Fees (bps)
          </span>
          <input
            type="number"
            min={0}
            max={100}
            value={config.feeBps}
            onChange={(event) =>
              update({ feeBps: Number.parseInt(event.target.value, 10) })
            }
            className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-zinc-900 shadow-sm transition focus:border-black focus:outline-none focus:ring-2 focus:ring-zinc-300 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:focus:border-zinc-200 dark:focus:ring-zinc-700"
            placeholder="5"
          />
        </label>

        <label className="flex flex-col gap-2 text-zinc-600 dark:text-zinc-300">
          <span className="font-medium text-zinc-800 dark:text-zinc-100">
            Slippage (bps)
          </span>
          <input
            type="number"
            min={0}
            max={100}
            value={config.slippageBps}
            onChange={(event) =>
              update({ slippageBps: Number.parseInt(event.target.value, 10) })
            }
            className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-zinc-900 shadow-sm transition focus:border-black focus:outline-none focus:ring-2 focus:ring-zinc-300 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:focus:border-zinc-200 dark:focus:ring-zinc-700"
            placeholder="5"
          />
        </label>
      </div>
    </section>
  );
}
