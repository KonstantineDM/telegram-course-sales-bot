export type mockDbCourse = {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  createdAt: Date;
  deletedAt: Date | null;
};

export const coursesMockDatabase: mockDbCourse[] = [
  {
    id: '1',
    name: 'AI integration',
    description: 'Master the intricacies of integrating AI agents into you project.',
    price: 100,
    currency: 'USD',
    createdAt: new Date('2025-01-01 12:00:00'),
    deletedAt: null,
  },
  {
    id: '2',
    name: 'Coding Conventions',
    description: 'Discover the most up to date conventions in popular programming languages.',
    price: 200,
    currency: 'USD',
    createdAt: new Date('2025-04-01 12:00:00'),
    deletedAt: null,
  },
  {
    id: '3',
    name: 'Telegram bot creation',
    description: 'Exhaustive guide on creating your own bots for Telegram',
    price: 150,
    currency: 'USD',
    createdAt: new Date('2025-08-01 12:00:00'),
    deletedAt: null,
  },
  {
    id: '4',
    name: 'How to grow cabbages',
    description: 'An agricultural manual on getting yourself a steady income of fresh vegetables.',
    price: 125,
    currency: 'USD',
    createdAt: new Date('2025-02-01 12:00:00'),
    deletedAt: new Date('2025-04-01 12:00:00'),
  },
];
