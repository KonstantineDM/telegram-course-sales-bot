import { Injectable } from '@nestjs/common';

@Injectable()
export class CoursesService {
  async getAvailableCourses(): Promise<any> {
    return Promise.resolve([
      {
        id: '1',
        name: 'Course 1',
        description: 'Course 1 description',
        price: 100,
        currency: 'USD',
      },
      {
        id: '2',
        name: 'Course 2',
        description: 'Course 2 description',
        price: 200,
        currency: 'USD',
      },
      {
        id: '3',
        name: 'Course 3',
        description: 'Course 3 description',
        price: 150,
        currency: 'USD',
      },
    ]);
  }

  async getById(id: string): Promise<any> {
    const courses = await this.getAvailableCourses();
    return courses.find((course: any) => course.id === id);
  }
}
