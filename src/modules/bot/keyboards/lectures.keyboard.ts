import { Markup } from 'telegraf';

export const lecturesKeyboard = (lectures: any) => {
  const buttons = [];

  for (const lecture of lectures) {
    buttons.push([Markup.button.callback(lecture.name, `LECTURE_${lecture.id}`)]);
  }

  return Markup.inlineKeyboard(buttons);
};
