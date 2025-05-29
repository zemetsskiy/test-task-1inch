import 'dotenv/config';
import { ethers } from 'ethers';

export const ETHEREUM_RPC_URL = process.env.ETHEREUM_RPC_URL;
export const provider = new ethers.JsonRpcProvider(ETHEREUM_RPC_URL);

export const UNISWAP_V2_FACTORY = '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f';
export const UNISWAP_V2_PAIR_ABI = [
  'function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast)',
  'function token0() external view returns (address)',
  'function token1() external view returns (address)'
];
export const UNISWAP_V2_FACTORY_ABI = [
  'function getPair(address tokenA, address tokenB) external view returns (address pair)'
]; 

if (!ETHEREUM_RPC_URL) {
  throw new Error('ETHEREUM_RPC_URL is not set');
}