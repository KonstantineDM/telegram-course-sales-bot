import { Injectable } from '@nestjs/common';
import { lecturesMockDatabase, mockDbLecture } from './mock/lectures-mock.database';

@Injectable()
export class LecturesService {
  private readonly db: mockDbLecture[];

  constructor() {
    this.db = lecturesMockDatabase;
  }

  async getAvailableLectures(): Promise<mockDbLecture[]> {
    return Promise.resolve(this.db.filter((lecture) => lecture.deletedAt === null));
  }

  async getById(id: string): Promise<mockDbLecture | null> {
    const lectures = this.db;
    return Promise.resolve(lectures.find((lecture: mockDbLecture) => lecture.id === id) ?? null);
  }
}
