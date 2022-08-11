import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { HealthController } from './health.controller';
import { UserModule } from './module/user/user.module';
import { ResponseInterceptor } from './util/interceptor';
import { ConfigModule } from '@nestjs/config';
import config from './coonfig/config';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({ load: [config], cache: true, isGlobal: true }),
  ],
  controllers: [HealthController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule {}
