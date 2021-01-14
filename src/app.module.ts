import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import * as config from 'config';

@Module({
  imports: [
    MongooseModule.forRoot(config.get("MONGO_DB")),
    ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
