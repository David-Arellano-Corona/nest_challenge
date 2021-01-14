import { Controller, Post, Get, Body, Query, Put, Delete, UsePipes, HttpException, HttpStatus } from '@nestjs/common';
import { ApiBody, ApiQuery,ApiCreatedResponse,ApiOkResponse, ApiResponse } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { ProductsDTO } from './DTO/products.dto';
import { ProductSearchDTO } from './DTO/product-search.dto';
import {ValidationPipe} from '../commons/validations';

@Controller('products')
export class ProductsController {

    constructor(private Product: ProductsService ){}
    @UsePipes(new ValidationPipe)
    @Get()
    @ApiOkResponse()
    async findProducts(@Query() filter:ProductSearchDTO){
        
        let Limit = parseInt(filter.Limit)
        let Page = parseInt(filter.Page)
        const offset  = Page == 1 ? 0 : (Page - 1) * Limit
        const products = await this.Product.findProducts(offset, Limit, filter.NameProduct, filter.Category);
        const total = await this.Product.totalPage(Limit)
        
        return {products,pages:total};
    }

    @ApiCreatedResponse({ description: 'Producto registrado'})
    @ApiResponse({status:404,description:"PRODUCT NOT FOUND"})
    @ApiResponse({status:500,description:"INTERNAL SERVER ERROR"})
    @UsePipes(new ValidationPipe)
    @Post()
    saveProduct(@Body() product: ProductsDTO):Promise<ProductsDTO>{
        const newProduct = this.Product.saveProduct(product);
        return newProduct;
    }

    @ApiOkResponse()
    @ApiResponse({status:404,description:"PRODUCT NOT FOUND"})
    @ApiResponse({status:500,description:"INTERNAL SERVER ERROR"})
    @ApiQuery({type:String, description:"Utilizado para la eliminaciòn del producto", required:true})
    @Delete()
    async deleteProduct(@Query("idProduct") idProduct:string ):Promise<ProductsDTO>{
        
        if(!idProduct)  throw new HttpException("idProduct IS NOT DEFINED",HttpStatus.NOT_FOUND);

        const product = await this.Product.deleteProduct(idProduct);
        return product;
    }

    @ApiOkResponse()
    @ApiResponse({status:404,description:"PRODUCT NOT FOUND"})
    @ApiResponse({status:500,description:"INTERNAL SERVER ERROR"})
    @UsePipes(new ValidationPipe)
    @Put()
    async updateProduct(@Body() product:ProductsDTO){
        
        const productEdited = await this.Product.updateProduct(product);
        return productEdited;

    }
}
