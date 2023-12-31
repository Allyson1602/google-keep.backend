import { Module } from '@nestjs/common';
import { ListingsModule } from './listings/listings.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from './data-source';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(DataSource),
    ListingsModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
