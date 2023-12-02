This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, set the environment variables:

```bash
# Your discord application ID
DISCORD_CLIENT_ID=""
# Your discord application secret
DISCORD_CLIENT_SECRET=""
 # Your next auth url, this is the default
NEXTAUTH_URL="http://localhost:3000"
# Your websocket url, ex: ws://localhost:3001
WEBSOCKET_URL=""
```

After, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Explanation:

The front-end assumes the websocket will send the following data:

for when a number is sorted:

```json
{
  "type": "roulette_result",
  "data": {
    "number": 10
  }
}
```

and after it, the data for the countdown until the next number is sorted

```json
{
  "type": "roulette_cooldown",
  "data": {
    "duration": 9e3
  }
}
```

> _The duration is in milliseconds_
