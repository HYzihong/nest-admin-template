import { Module } from '@nestjs/common';
import { configModule, statusMonitor, typeOrmModule } from 'config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
  configModule('admin'),
  typeOrmModule(),
  statusMonitor()
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  
}
