import { Action, Ctx, Start, Update } from 'nestjs-telegraf';
import { CoursesService } from 'src/courses/courses.service';
import { Context } from 'telegraf';
import { BotActionEnum } from './enums/bot-action.enum';
import { coursesKeyboard } from './keyboards/courses.keyboard';
import { mainMenuKeyboard } from './keyboards/main-menu.keyboard';

@Update()
export class BotUpdate {
  constructor(private readonly coursesService: CoursesService) {}

  @Start()
  async start(@Ctx() ctx: Context) {
    const user = ctx.from!;

    const reply =
      `Welcome${user?.username ? `, ${user.username}!` : ''}\n\n` +
      'What are you interested in? Choose from the options below.';

    await ctx.reply(reply, mainMenuKeyboard(user));
  }

  @Action(BotActionEnum.MENU_COURSES)
  async courses(@Ctx() ctx: Context) {
    const courses = await this.coursesService.getAvailableCourses();
    await ctx.reply('Choose the desired course to learn details', coursesKeyboard(courses));
  }

  @Action(BotActionEnum.MENU_LECTURES)
  async lectures(@Ctx() ctx: Context) {
    await ctx.reply('Lectures list');
  }

  @Action(BotActionEnum.MENU_VIDEOS)
  async videos(@Ctx() ctx: Context) {
    await ctx.reply('Video records list');
  }

  @Action(BotActionEnum.MENU_OFFER)
  async showOffer(@Ctx() ctx: Context) {
    await ctx.reply('The text of the offer');
  }
}
