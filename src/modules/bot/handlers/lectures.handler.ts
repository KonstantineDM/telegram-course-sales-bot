import type { MockPaymentProviderInterface } from '@integrations/mock-payment-provider/mock-payment-provider.interface';
import { LecturesService } from '@lectures/lectures.service';
import { Inject, NotFoundException } from '@nestjs/common';
import crypto from 'crypto';
import { Action, Ctx, Update } from 'nestjs-telegraf';
import { Context, Markup } from 'telegraf';

@Update()
export class LecturesHandler {
  constructor(
    private readonly lecturesService: LecturesService,
    @Inject('PAYMENT_PROVIDER') private readonly paymentProvider: MockPaymentProviderInterface,
  ) {}

  @Action(/^LECTURE_(\d+)$/)
  async lectureDetails(
    @Ctx()
    ctx: Context & {
      match: RegExpExecArray;
    },
  ) {
    const lectureId = ctx.match[1];

    const lecture = await this.lecturesService.getById(lectureId);

    if (!lecture) {
      throw new NotFoundException(`Lecture ${lectureId} not found`);
    }

    const price = `${lecture.price} ${lecture.currency}`;

    const reply = `${lecture.name}\n\n` + `${lecture.description}\n\n` + `Price: ${price}`;

    const payButton = Markup.inlineKeyboard([Markup.button.callback(`Pay: ${price}`, `PAY_LECTURE_${lecture.id}`)]);

    await ctx.reply(reply, payButton);
  }

  @Action(/^PAY_LECTURE_(\d+)$/)
  async payLecture(
    @Ctx()
    ctx: Context & {
      match: RegExpExecArray;
    },
  ) {
    const lectureId = ctx.match[1];

    const lecture = await this.lecturesService.getById(lectureId);

    if (!lecture) {
      throw new NotFoundException(`Lecture ${lectureId} not found`);
    }

    const paymentId = crypto.randomUUID();

    const paymentResult = await this.paymentProvider.createPayment({
      idempotenceKey: paymentId,
      amount: { value: String(lecture.price), currency: lecture.currency },
      confirmation: { type: 'redirect', return_url: 'https://return-url.com' },
      payment_method: {
        type: 'card',
      },
      description: 'Payment for lecture purchase',
    });

    const payUrl = paymentResult.confirmation.confirmation_url;

    await ctx.reply(
      `Your payment link:\n${payUrl}\n\n` + 'After successful payment you will receive a link to purchased product.',
    );
  }
}
