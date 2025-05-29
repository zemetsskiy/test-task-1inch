import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GasController } from './gas.controller';
import { UniswapController } from './uniswap.controller';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [AppController, GasController, UniswapController],
  providers: [AppService],
})
export class AppModule {}