import { Module } from '@nestjs/common';
import { ListingsModule } from './listings/listings.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from './data-source';

@Module({
  imports: [ListingsModule, TypeOrmModule.forRoot(DataSource)],
  controllers: [],
  providers: [],
})
export class AppModule {}
