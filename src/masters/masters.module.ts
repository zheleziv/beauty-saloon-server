import { Module } from '@nestjs/common';
import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';
import { MastersController } from './masters.controller';

@Module({
  imports: [InMemoryDBModule.forFeature('masters')],
  controllers: [MastersController]
})
export class MastersModule { }
