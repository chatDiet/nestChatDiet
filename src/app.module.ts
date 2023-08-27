import {
  Module,
  MiddlewareConsumer,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtConfigService } from './configs/jwt.config.service';
import { AuthMiddleware } from './middlewares/auth.middlewares';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CalenderModule } from './calender/calender.module';
import { ChatModule } from './chat/chat.module';
import { CommentModule } from './comment/comment.module';
import { CompanyModule } from './company/company.module';
import { ContractModule } from './contract/contract.module';
import { InquiryModule } from './inquiry/inquiry.module';
import { PostModule } from './post/post.module';
import { ReportModule } from './report/report.module';
import { ReviewModule } from './review/review.module';
import { ScheduleModule } from './schedule/schedule.module';
import { TrainerModule } from './trainer/trainer.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({ useFactory: () => typeORMConfig }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useClass: JwtConfigService,
      inject: [ConfigService],
    }),
    CalenderModule,
    CompanyModule,
    ContractModule,
    ChatModule,
    InquiryModule,
    ReportModule,
    PostModule,
    ReviewModule,
    ScheduleModule,
    TrainerModule,
    UserModule,
    CommentModule,
  ],

  providers: [AppService, AuthMiddleware],
  exports: [AppService],
  controllers: [AppController],
})
// 여기에 미들웨어 걸어주면 됩니다 !
export class AppModule {}

console.log('DB연결 정보', typeORMConfig);
