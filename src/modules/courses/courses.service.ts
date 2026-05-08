import { Injectable } from '@nestjs/common';
import { coursesMockDatabase, mockDbCourse } from './mock/courses-mock.database';

@Injectable()
export class CoursesService {
  private readonly db: mockDbCourse[];

  constructor() {
    this.db = coursesMockDatabase;
  }

  async getAvailableCourses(): Promise<mockDbCourse[]> {
    return Promise.resolve(this.db.filter((course) => course.deletedAt === null));
  }

  async getById(id: string): Promise<mockDbCourse | null> {
    const courses = this.db;
    return Promise.resolve(courses.find((course: mockDbCourse) => course.id === id) ?? null);
  }
}
