import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { LectureSequelizeModel } from './infrastructure/sequelize/lecture.sequelize.model';
import { LectureSequelizeRepository } from './infrastructure/sequelize/lecture.sequelize.repository';
import { LecturesService } from './lectures.service';

@Module({
  imports: [SequelizeModule.forFeature([LectureSequelizeModel])],
  providers: [LecturesService, LectureSequelizeRepository],
  exports: [LecturesService],
})
export class LecturesModule {}
