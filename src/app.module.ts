import { Module } from '@nestjs/common';
import { ListingsModule } from './listings/listings.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Listing } from './listings/entities/listing.entity';
import { DataSource } from './data-source';

const listing = new Listing();
listing.title = 'Minha nova listagem';
listing.tasks = [];

@Module({
  imports: [ListingsModule, TypeOrmModule.forRoot(DataSource)],
  controllers: [],
  providers: [],
})
export class AppModule {}
