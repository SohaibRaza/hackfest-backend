import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthenticationModule } from '~src/modules/authentication/authentication.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/heckfest_db'),
    AuthenticationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
