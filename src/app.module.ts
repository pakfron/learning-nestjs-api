import { MiddlewareConsumer, Module,ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { User } from './users/user.entity';
import { Report } from './reports/report.entity'; 
import { TypeOrmModule } from '@nestjs/typeorm';
const cookieSession = require('cookie-session')

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'test_nest',
      entities: [User,Report],
      synchronize: false,
      migrations:['migrations/*js'],
      migrationsTableName: "migrations"
    }),
    UsersModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [AppService,{
    provide:APP_PIPE,
    useValue:new ValidationPipe({
      whitelist:true
    })
  }],
})
export class AppModule {
  configure(consumer : MiddlewareConsumer){
    consumer.apply(cookieSession({
      keys:['asdlkfj'],
    })).forRoutes('*')

  }
  

}
