import { runBacktest } from "@/lib/backtest";
import { fetchHistoricalPrices } from "@/lib/market";
import { normalizeConfig } from "@/lib/strategy";
import { StrategyConfig } from "@/lib/types";
import { NextRequest } from "next/server";
import { z } from "zod";

const payloadSchema = z.object({
  symbol: z.string().min(1, "Symbol is required"),
  fastLength: z.number().int().positive().optional(),
  slowLength: z.number().int().positive().optional(),
  initialCapital: z.number().positive().optional(),
  feeBps: z.number().nonnegative().optional(),
  slippageBps: z.number().nonnegative().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const data = payloadSchema.parse(json);
    const config = normalizeConfig(data as Partial<StrategyConfig>);

    const candles = await fetchHistoricalPrices(config.symbol, "1y", "1d");
    const result = runBacktest(candles, config);

    return Response.json({ data: result });
  } catch (error) {
    console.error("Backtest error", error);
    const message =
      error instanceof Error ? error.message : "Unable to run backtest";

    return Response.json({ error: message }, { status: 400 });
  }
}
