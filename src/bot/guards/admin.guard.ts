import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TelegrafExecutionContext } from 'nestjs-telegraf';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const ctx = TelegrafExecutionContext.create(context).getContext();

    const adminIds = this.configService.get<string>('ADMIN_IDS')?.split(',').map(Number);

    return adminIds?.includes(ctx.from.id) ?? false;
  }
}
