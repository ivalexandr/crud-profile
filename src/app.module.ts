import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entites/user.entity';
import { DataSource } from 'typeorm';
@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.HOST,
      port: Number(process.env.PORTDB),
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      entities: [User],
      synchronize: true,
      ssl: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private readonly dataSource: DataSource) {}
}
