# test-task-1inch

## Quick Start

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd test-task-1inch
   npm install
   ```

2. Create a `.env` file in the project root and add:
   ```env
   ETHEREUM_RPC_URL=https://mainnet.infura.io/v3/YOUR_INFURA_KEY
   PORT=3000
   ```

3. Start the project:
   ```bash
   npm run start
   ```

## Main Endpoints

- `GET /gasPrice` — get the current Ethereum gas price
- `GET /return/:fromTokenAddress/:toTokenAddress/:amountIn` — get UniswapV2 swap output estimate