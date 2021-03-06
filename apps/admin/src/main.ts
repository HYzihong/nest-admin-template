import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { Logger } from '@app/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 全局路由前缀 接口请求前缀
  app.setGlobalPrefix('api');

  // 安全防御中间件 npm i --save helmet
  // app.use(helmet());
  app.use(helmet({ contentSecurityPolicy: false }));

  // 日志 new Logger(fileName)
  const logger = new Logger(process.env.LOG_PATH);
  app.useLogger(logger)

  // swagger 接口文档 npm install --save @nestjs/swagger swagger-ui-express
  const options = new DocumentBuilder()
    .setTitle('管理后台接口文档')
    .setDescription('code:状态码，message:提示信息，data:返回值')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);

  console.log(process.env)
  await app.listen(3000);
  console.log(`
    Starting development server at http://localhost:3000/
    Swagger at http://localhost:3000/swagger
    Quit the server with CONTROL-C.
  `);

  logger.log(' Starting development server at',`http://localhost:3000/${process.env.SERVE_PORT}`);
}
bootstrap();
