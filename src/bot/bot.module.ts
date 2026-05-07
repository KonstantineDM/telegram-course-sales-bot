import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TelegrafModule } from 'nestjs-telegraf';

import { CoursesModule } from 'src/courses/courses.module';
import { BotService } from './bot.service';
import { BotUpdate } from './bot.update';
import { CoursesUpdate } from './updates/courses.update';

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        token: configService.getOrThrow<string>('TELEGRAM_BOT_TOKEN'),
      }),
    }),

    CoursesModule,
  ],
  providers: [BotService, BotUpdate, CoursesUpdate],
})
export class BotModule {}
