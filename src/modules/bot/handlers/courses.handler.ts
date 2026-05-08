import { CoursesService } from '@courses/courses.service';
import type { MockPaymentProviderInterface } from '@integrations/mock-payment-provider/mock-payment-provider.interface';
import { Inject, NotFoundException } from '@nestjs/common';
import crypto from 'crypto';
import { Action, Ctx, Update } from 'nestjs-telegraf';
import { Context, Markup } from 'telegraf';

@Update()
export class CoursesHandler {
  constructor(
    private readonly coursesService: CoursesService,
    @Inject('PAYMENT_PROVIDER') private readonly paymentProvider: MockPaymentProviderInterface,
  ) {}

  @Action(/^COURSE_(\d+)$/)
  async courseDetails(
    @Ctx()
    ctx: Context & {
      match: RegExpExecArray;
    },
  ) {
    const courseId = ctx.match[1];

    const course = await this.coursesService.getById(courseId);

    if (!course) {
      throw new NotFoundException(`Course ${courseId} not found`);
    }

    const price = `${course.price} ${course.currency}`;

    const reply = `${course.name}\n\n` + `${course.description}\n\n` + `Price: ${price}`;

    const payButton = Markup.inlineKeyboard([Markup.button.callback(`Pay: ${price}`, `PAY_COURSE_${course.id}`)]);

    await ctx.reply(reply, payButton);
  }

  @Action(/^PAY_COURSE_(\d+)$/)
  async payCourse(
    @Ctx()
    ctx: Context & {
      match: RegExpExecArray;
    },
  ) {
    const courseId = ctx.match[1];

    const course = await this.coursesService.getById(courseId);

    if (!course) {
      throw new NotFoundException(`Course ${courseId} not found`);
    }

    const paymentId = crypto.randomUUID();

    const paymentResult = await this.paymentProvider.createPayment({
      idempotenceKey: paymentId,
      amount: { value: String(course.price), currency: course.currency },
      confirmation: { type: 'redirect', return_url: 'https://return-url.com' },
      payment_method: {
        type: 'card',
      },
      description: 'Payment for course purchase',
    });

    const payUrl = paymentResult.confirmation.confirmation_url;

    await ctx.reply(
      `Your payment link:\n${payUrl}\n\n` + 'After successful payment you will receive a link to purchased product.',
    );
  }
}
