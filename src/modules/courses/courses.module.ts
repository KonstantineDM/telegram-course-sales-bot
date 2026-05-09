import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SharedModule } from '../shared/shared.module';
import { CoursesService } from './courses.service';
import { CourseSequelizeModel } from './infrastructure/sequelize/course.sequelize.model';
import { CourseSequelizeRepository } from './infrastructure/sequelize/course.sequelize.repository';

@Module({
  imports: [SharedModule, SequelizeModule.forFeature([CourseSequelizeModel])],
  providers: [CoursesService, CourseSequelizeRepository],
  exports: [CoursesService],
})
export class CoursesModule {}
