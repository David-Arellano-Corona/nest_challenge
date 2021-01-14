import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsSchema } from './models/products.schema';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
@Module({
    imports:[
        MongooseModule.forFeature([
            {name:"Products", schema:ProductsSchema}
        ])
    ],
    controllers: [ProductsController],
    providers: [ProductsService]
})
export class ProductsModule {}
