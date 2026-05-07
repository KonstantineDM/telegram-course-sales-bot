import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectBot } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';

@Injectable()
export class BotService implements OnModuleInit {
  constructor(@InjectBot() private readonly bot: Telegraf<Context>) {}

  async onModuleInit() {
    await this.bot.telegram.setMyCommands([
      { command: 'start', description: 'Start the bot' },
      { command: 'help', description: 'Show help information' },
      { command: 'settings', description: 'Open bot settings' },
    ]);
  }
}
