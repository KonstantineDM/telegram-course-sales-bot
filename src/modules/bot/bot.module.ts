import { CoursesModule } from '@courses/courses.module';
import { MockPaymentProviderService } from '@integrations/mock-payment-provider/mock-payment-provider.service';
import { LecturesModule } from '@lectures/lectures.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TelegrafModule } from 'nestjs-telegraf';
import { BotService } from './bot.service';
import { BotHandler } from './handlers/bot.handler';
import { CoursesHandler } from './handlers/courses.handler';
import { LecturesHandler } from './handlers/lectures.handler';

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
    LecturesModule,
  ],
  providers: [
    { provide: 'PAYMENT_PROVIDER', useClass: MockPaymentProviderService },
    BotService,
    BotHandler,
    CoursesHandler,
    LecturesHandler,
  ],
})
export class BotModule {}
