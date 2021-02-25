/*
 * @Author: your name
 * @Date: 2021-02-25 11:32:27
 * @LastEditTime: 2021-02-25 14:59:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /nest-admin-template/apps/admin/src/app.module.ts
 */
import { Module } from '@nestjs/common';
import { configModule, typeOrmModule } from 'config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [configModule('admin'),typeOrmModule()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
