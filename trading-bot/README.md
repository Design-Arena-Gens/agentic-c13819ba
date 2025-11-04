## Agentic Alpha — Moving-Average Trading Bot

Agentic Alpha is a web-based trading terminal that runs a moving-average crossover strategy on live Yahoo Finance market data. It ships with:

- Strategy configuration panel (symbol, MA lengths, capital, fees, slippage)
- Serverless backtesting engine with trade-by-trade attribution
- Interactive equity/price visualizations and ledger exports

The project is built with Next.js (App Router), Tailwind CSS, and Recharts, and is ready for Vercel deployment.

## Getting Started

Install dependencies (if you haven’t already) and start the dev server:

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to interact with the dashboard.

### Backtesting API

| Endpoint | Method | Description |
| --- | --- | --- |
| `/api/backtest` | `POST` | Runs a moving-average crossover backtest. |
| `/api/market/:symbol` | `GET` | Fetches raw OHLCV data from Yahoo Finance. |

## Deploying to Vercel

The repository is preconfigured for seamless Vercel deployment:

```bash
vercel deploy --prod --yes --token $VERCEL_TOKEN --name agentic-c13819ba
```

After deployment, confirm the production URL:

```bash
curl https://agentic-c13819ba.vercel.app
```

## License

MIT © Agentic Alpha Contributors
