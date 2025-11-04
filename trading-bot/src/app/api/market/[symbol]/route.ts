import { fetchHistoricalPrices } from "@/lib/market";
import { NextRequest } from "next/server";
import { z } from "zod";

const querySchema = z.object({
  range: z
    .string()
    .default("6mo")
    .transform((value) => value.trim() || "6mo"),
  interval: z
    .string()
    .default("1d")
    .transform((value) => value.trim() || "1d"),
});

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ symbol: string }> },
) {
  try {
    const { symbol } = await context.params;
    const { range, interval } = querySchema.parse(
      Object.fromEntries(req.nextUrl.searchParams),
    );

    const candles = await fetchHistoricalPrices(symbol, range, interval);

    return Response.json({ data: candles });
  } catch (error) {
    console.error("Market data error", error);
    return Response.json(
      {
        error:
          error instanceof Error ? error.message : "Unable to fetch market data",
      },
      { status: 400 },
    );
  }
}
