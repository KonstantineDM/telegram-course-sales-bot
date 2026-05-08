import { Module } from '@nestjs/common';
import { LecturesService } from './lectures.service';

@Module({
  providers: [LecturesService],
  exports: [LecturesService],
})
export class LecturesModule {}
