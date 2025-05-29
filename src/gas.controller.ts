import { Controller, Get } from '@nestjs/common';
import { ETHEREUM_RPC_URL, provider } from './config';

let lastGasPrice: bigint = 0n;

function withTimeout<T>(promise: Promise<T>, ms: number, fallback: T): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>(resolve => setTimeout(() => resolve(fallback), ms)),
  ]);
}

@Controller('gasPrice')
export class GasController {
  @Get()
  async getGasPrice() {
    const feeDataPromise = provider.getFeeData().then(feeData => {
      if (feeData.gasPrice) lastGasPrice = feeData.gasPrice;
      return feeData.gasPrice ?? lastGasPrice;
    }).catch(() => lastGasPrice);
    const gasPrice = await withTimeout(feeDataPromise, 50, lastGasPrice);
    return { gasPrice: gasPrice.toString() };
  }
} 