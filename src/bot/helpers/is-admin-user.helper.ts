export const isAdminUser = (telegramId: number): boolean => {
  const adminIds = (process.env.ADMIN_IDS || '').split(',').map(Number);

  return adminIds.includes(telegramId);
};
