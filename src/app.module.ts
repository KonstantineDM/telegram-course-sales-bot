import { BotModule } from '@bot/bot.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), BotModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
