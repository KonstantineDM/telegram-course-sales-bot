import { Injectable } from '@nestjs/common';
import { LectureSequelizeModel } from './infrastructure/sequelize/lecture.sequelize.model';
import { LectureSequelizeRepository } from './infrastructure/sequelize/lecture.sequelize.repository';

@Injectable()
export class LecturesService {
  constructor(private readonly lectureRepository: LectureSequelizeRepository) {}

  async getAvailableLectures(): Promise<LectureSequelizeModel[]> {
    return this.lectureRepository.getAvailableLectures();
  }

  async getById(id: string): Promise<LectureSequelizeModel | null> {
    return this.lectureRepository.getById(id);
  }
}
