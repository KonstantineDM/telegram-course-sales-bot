import { Markup } from 'telegraf';

export const coursesKeyboard = (courses: any) => {
  const buttons = [];

  for (const course of courses) {
    buttons.push(Markup.button.callback(course.name, `COURSE_${course.id}`));
  }

  return Markup.inlineKeyboard(buttons);
};
