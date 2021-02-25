import { TypeOrmModule } from "@nestjs/typeorm";//npm install --save @nestjs/typeorm typeorm mysql
import { ConfigModule } from "@nestjs/config";//npm i --save @nestjs/config
import { ConfigModuleOptions } from '@nestjs/config/dist/interfaces';
import  ip from 'ip';//npm i -D @types/ip   npm i --save ip

const isHome = /^192.168.31./.test(ip.address());
console.log('当前ip:',ip.address(),isHome?'是线上环境':'是线下环境');

/**
 * 配置环境模块初始化
 */
export const configModule = (path: string, options?: ConfigModuleOptions) =>
  ConfigModule.forRoot({
    envFilePath: [isHome ? null : 'config/.dev.env', `config/apps/${path}.env`, 'config/.env'],
    ...options,
  });


/**
 * 数据库模块初始化
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

