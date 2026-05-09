import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BaseSequelizeRepository } from '@shared/infrastructure/sequelize/base.repository';
import { LectureSequelizeModel } from './lecture.sequelize.model';

@Injectable()
export class LectureSequelizeRepository extends BaseSequelizeRepository<LectureSequelizeModel> {
  constructor(
    @InjectModel(LectureSequelizeModel)
    model: typeof LectureSequelizeModel,
  ) {
    super(model);
  }

  async getAvailableLectures(): Promise<LectureSequelizeModel[]> {
    return this.model.findAll({ where: { deletedAt: null }, raw: true });
  }

  async getById(id: string): Promise<LectureSequelizeModel | null> {
    return this.model.findOne({ where: { id }, raw: true });
  }
}
