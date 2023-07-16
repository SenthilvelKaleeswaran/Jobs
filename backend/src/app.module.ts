import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JobController } from './job/job.controller';
import { JobService } from './job/job.service';
import { JobModule } from './job/job.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { JobSchema } from './job/schema/job.schema';
import * as path from 'path';

import {AcceptLanguageResolver,I18nModule,QueryResolver} from 'nestjs-i18n';

// require('dotenv').config();


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot('mongodb+srv://senthilvel_svk:Qwerty654321%40@cluster0.6eqp768.mongodb.net/JOBS'),

    MongooseModule.forFeature([{ name: 'Job', schema: JobSchema }]),
   
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      fallbacks: {
        en: 'en',
        es: 'es',
      },
      loaderOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true,
      },
      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
      ],
    }),
    JobModule,
  ],
  controllers: [AppController, JobController],
  providers: [AppService, JobService],
})
export class AppModule {}
