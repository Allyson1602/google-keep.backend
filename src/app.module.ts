import { Module } from '@nestjs/common';
import { ListingsModule } from './listings/listings.module';

@Module({
  imports: [ListingsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
