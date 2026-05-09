import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BaseSequelizeRepository } from '@shared/infrastructure/sequelize/base.repository';
import { CourseSequelizeModel } from './course.sequelize.model';

@Injectable()
export class CourseSequelizeRepository extends BaseSequelizeRepository<CourseSequelizeModel> {
  constructor(
    @InjectModel(CourseSequelizeModel)
    model: typeof CourseSequelizeModel,
  ) {
    super(model);
  }

  async getAvailableCourses(): Promise<CourseSequelizeModel[]> {
    return this.model.findAll({ where: { deletedAt: null }, raw: true });
  }

  async getById(id: string): Promise<CourseSequelizeModel | null> {
    return this.model.findOne({ where: { id }, raw: true });
  }
}
