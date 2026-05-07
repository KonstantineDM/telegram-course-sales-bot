import { Markup } from 'telegraf';
import { User } from 'telegraf/types';
import { BotActionEnum } from '../enums/bot-action.enum';
import { isAdminUser } from '../helpers/is-admin-user.helper';

export const mainMenuKeyboard = (user: User) => {
  const buttons = [
    Markup.button.callback('📚 Courses', BotActionEnum.MENU_COURSES),
    Markup.button.callback('📝 Lectures', BotActionEnum.MENU_LECTURES),
    Markup.button.callback('🎬 Videos', BotActionEnum.MENU_VIDEOS),
    Markup.button.callback('📜 Offer', BotActionEnum.MENU_OFFER),
  ];

  const isAdmin = isAdminUser(user.id);

  if (isAdmin) {
    // buttons.push(Markup.button.callback('📜 Offer', BotActionEnum.MENU_OFFER));
  }

  return Markup.inlineKeyboard(buttons);
};
