import { Injectable } from '@nestjs/common';
import { CourseSequelizeModel } from './infrastructure/sequelize/course.sequelize.model';
import { CourseSequelizeRepository } from './infrastructure/sequelize/course.sequelize.repository';

@Injectable()
export class CoursesService {
  constructor(private readonly courseRepository: CourseSequelizeRepository) {}

  async getAvailableCourses(): Promise<CourseSequelizeModel[]> {
    return this.courseRepository.getAvailableCourses();
  }

  async getById(id: string): Promise<CourseSequelizeModel | null> {
    return this.courseRepository.getById(id);
  }
}
