import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { Logger } from '@app/logger';
import { HttpExceptionFilter, DataResponseInterceptor } from '@app/middleware';

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

  // 响应参数统一格式
  app.useGlobalInterceptors(new DataResponseInterceptor(logger));

  // 报错过滤器
  app.useGlobalFilters(new HttpExceptionFilter(logger));

  // swagger 接口文档
  // npm install --save @nestjs/swagger swagger-ui-express
  const options = new DocumentBuilder()
    .setTitle(process.env.SWAGGER_TITLE)
    .setDescription(process.env.SWAGGER_DESCRIPTION)
    .addServer(process.env.SERVE_PREFIX)
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);

  // console.log(process.env)
  await app.listen(3000);
  console.log(`
    Starting development server at http://localhost:${process.env.SERVE_PORT}}/
    ${process.env.SWAGGER_TITLE} Swagger at http://localhost:3000/${process.env.SWAGGER_PATH}
    Quit the server with CONTROL-C.
  `);

}
bootstrap();
