import { Controller, Get, Param, BadRequestException } from '@nestjs/common';
import { ethers } from 'ethers';
import { provider, UNISWAP_V2_FACTORY, UNISWAP_V2_PAIR_ABI, UNISWAP_V2_FACTORY_ABI } from './config';

@Controller('return')
export class UniswapController {
  @Get(':fromTokenAddress/:toTokenAddress/:amountIn')
  async getReturn(
    @Param('fromTokenAddress') fromTokenAddress: string,
    @Param('toTokenAddress') toTokenAddress: string,
    @Param('amountIn') amountIn: string
  ) {
    try {
      if (!ethers.isAddress(fromTokenAddress) || !ethers.isAddress(toTokenAddress)) {
        throw new BadRequestException('Invalid token address');
      }
      const amountInBN = BigInt(amountIn);
      if (amountInBN <= 0n) {
        throw new BadRequestException('amountIn must be positive');
      }
      const factory = new ethers.Contract(UNISWAP_V2_FACTORY, UNISWAP_V2_FACTORY_ABI, provider);
      const pairAddress = await factory.getPair(fromTokenAddress, toTokenAddress);
      if (pairAddress === ethers.ZeroAddress) {
        throw new BadRequestException('No UniswapV2 pair for this token pair');
      }
      const pair = new ethers.Contract(pairAddress, UNISWAP_V2_PAIR_ABI, provider);
      const [token0, token1] = await Promise.all([
        pair.token0(),
        pair.token1()
      ]);
      const { reserve0, reserve1 } = await pair.getReserves();
      let reserveIn, reserveOut;
      if (fromTokenAddress.toLowerCase() === token0.toLowerCase()) {
        reserveIn = BigInt(reserve0);
        reserveOut = BigInt(reserve1);
      } else {
        reserveIn = BigInt(reserve1);
        reserveOut = BigInt(reserve0);
      }

      const amountInWithFee = amountInBN * 997n;
      const numerator = amountInWithFee * reserveOut;
      const denominator = reserveIn * 1000n + amountInWithFee;
      const amountOut = numerator / denominator;
      return { amountOut: amountOut.toString() };
    } catch (e) {
      if (e instanceof BadRequestException) throw e;
      throw new BadRequestException('Error calculating return: ' + (e.message || e));
    }
  }
} 