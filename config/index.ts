import { TypeOrmModule } from "@nestjs/typeorm";//npm install --save @nestjs/typeorm typeorm mysql
import { ConfigModule } from "@nestjs/config";//npm i --save @nestjs/config
import { ConfigModuleOptions } from '@nestjs/config/dist/interfaces';
import  ip from 'ip';
//npm i -D @types/ip   npm i --save ip
import { Logger } from '@app/logger';
import { StatusMonitorModule } from "nest-status-monitor";
import { MonitoringConfig } from "./apps/monitoringConfig";
// npm install nest-status-monitor @nestjs/websockets @nestjs/platform-socket.io --save  安装后最好再次进行yarn | npm i 防止出现找不到模块
//  npm i --save-dev @types/socket.io
// import { Cron, CronExpression } from '@nestjs/schedule';
// import path from 'path';

// 当前ip
// inet4 - IPv4
// inet6 - IPv6
// inet  - 系统默认，一般是IPv4
const isHome = /^192.168.31./.test(ip.address());
const logger = new Logger('logs')
logger.log(`inet addr ${ip.address()}`,isHome?'production':'development')


/**
 * 配置环境模块初始化
 */
export const configModule = (path: string, options?: ConfigModuleOptions) =>
  ConfigModule.forRoot({
    envFilePath: [isHome ? null : 'config/.dev.env', `config/apps/${path}.env`, 'config/.env'],
    ...options,
  });


/*
  数据库模块初始化
 */
export const typeOrmModule = () =>
  TypeOrmModule.forRootAsync({
    useFactory: () => ({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
    }),
  });

  /*
    服务器监控
  */
  export const statusMonitor = ()=> StatusMonitorModule.setUp(MonitoringConfig)

  
// TODO 数据库定时备份
// export class Crontab {
//
//   @Cron(CronExpression.EVERY_DAY_AT_3AM)
//   dumpDatabase(){
//     if(!isHome){// 仅仅在生产环境下选择备份
//       let filepath = path.join(__dirname,'./')
//       cp.exec(`sh ${filepath}`,()=>{
//         console.log('dumpDatabase',err,res);
//       })
//     }
//   }
// }
