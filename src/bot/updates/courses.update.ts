import crypto from 'crypto';
import { Action, Ctx, Update } from 'nestjs-telegraf';
import { CoursesService } from 'src/courses/courses.service';
import { Context, Markup } from 'telegraf';

@Update()
export class CoursesUpdate {
  constructor(private readonly coursesService: CoursesService) {}

  @Action(/^COURSE_(\d+)$/)
  async courseDetails(
    @Ctx()
    ctx: Context & {
      match: RegExpExecArray;
    },
  ) {
    const courseId = ctx.match[1];

    const course = await this.coursesService.getById(courseId);

    const price = `${course.price} ${course.currency}`;

    const reply = `${course.name}\n\n` + `${course.description}\n` + `Price: ${price}`;

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
    const paymentUuid = crypto.randomUUID();

    const payUrl = `https://payment-provider.com/${paymentUuid}`;

    await ctx.reply(
      `Your payment link:\n${payUrl}\n\nAfter successful payment you will receive a link to purchased product.`,
    );
  }
}
