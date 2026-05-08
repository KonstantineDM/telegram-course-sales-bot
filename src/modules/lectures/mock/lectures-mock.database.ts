export type mockDbLecture = {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  createdAt: Date;
  deletedAt: Date | null;
};

export const lecturesMockDatabase: mockDbLecture[] = [
  {
    id: '1',
    name: 'On prospects of programming',
    description: 'Insight into the nearest and far future of programming.',
    price: 80,
    currency: 'USD',
    createdAt: new Date('2025-02-01 12:00:00'),
    deletedAt: null,
  },
  {
    id: '2',
    name: 'Be professional',
    description: 'How to adhere to a strong personal code of professional behavior.',
    price: 120,
    currency: 'USD',
    createdAt: new Date('2025-04-01 12:00:00'),
    deletedAt: null,
  },
  {
    id: '3',
    name: 'Hardships of development',
    description: 'A lecture on the "dark" side of being a programmer as well as the "bright" side of it.',
    price: 110,
    currency: 'USD',
    createdAt: new Date('2025-08-01 12:00:00'),
    deletedAt: null,
  },
];
