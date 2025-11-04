'use client';

import { Trade } from "@/lib/types";

type TradesTableProps = {
  trades: Trade[];
  isLoading: boolean;
};

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});

const percent = (value: number) =>
  `${value > 0 ? "+" : ""}${value.toFixed(2)}%`;

export function TradesTable({ trades, isLoading }: TradesTableProps) {
  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Trade Ledger
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Detailed execution log for each position.
          </p>
        </div>
        <span className="text-xs font-medium uppercase tracking-wide text-zinc-400 dark:text-zinc-500">
          {trades.length} trades
        </span>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div
              key={idx}
              className="h-10 animate-pulse rounded-lg bg-zinc-100 dark:bg-zinc-900"
            />
          ))}
        </div>
      ) : trades.length > 0 ? (
        <div className="overflow-hidden rounded-xl border border-zinc-100 dark:border-zinc-800">
          <table className="w-full min-w-[600px] divide-y divide-zinc-200 text-sm dark:divide-zinc-800">
            <thead className="bg-zinc-50 text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:bg-zinc-900 dark:text-zinc-400">
              <tr>
                <th className="px-4 py-3 text-left">Entry</th>
                <th className="px-4 py-3 text-left">Exit</th>
                <th className="px-4 py-3 text-right">Qty</th>
                <th className="px-4 py-3 text-right">Entry Price</th>
                <th className="px-4 py-3 text-right">Exit Price</th>
                <th className="px-4 py-3 text-right">Profit</th>
                <th className="px-4 py-3 text-right">Return</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {trades.map((trade, idx) => (
                <tr key={`${trade.entryDate}-${idx}`} className="text-zinc-700 dark:text-zinc-200">
                  <td className="px-4 py-3">{trade.entryDate}</td>
                  <td className="px-4 py-3">{trade.exitDate}</td>
                  <td className="px-4 py-3 text-right">
                    {Number(trade.quantity.toFixed(2))}
                  </td>
                  <td className="px-4 py-3 text-right">
                    {currency.format(trade.entryPrice)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    {currency.format(trade.exitPrice)}
                  </td>
                  <td
                    className={`px-4 py-3 text-right font-semibold ${
                      trade.profit >= 0 ? "text-emerald-500" : "text-red-500"
                    }`}
                  >
                    {currency.format(trade.profit)}
                  </td>
                  <td
                    className={`px-4 py-3 text-right font-semibold ${
                      trade.returnPct >= 0 ? "text-emerald-500" : "text-red-500"
                    }`}
                  >
                    {percent(trade.returnPct)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-zinc-200 p-10 text-center text-sm text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
          No trades executed for the selected window.
        </div>
      )}
    </section>
  );
}
