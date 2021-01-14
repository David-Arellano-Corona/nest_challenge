import { HttpException, Injectable,HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Products } from './models/products.schema';
import { ProductsDTO } from './DTO/products.dto';
import {Category} from '../commons/category.enum'
@Injectable()
export class ProductsService {
    constructor(
        @InjectModel('Products') private productsModel: Model<Products>
    ){}

    async totalPage(limit:number){
        const count = await this.productsModel.estimatedDocumentCount();
        const module = count%limit;
        const totalPages = Math.floor(count/limit) + (module ? 1 : 0);
        return totalPages;
    }    

    async findProducts(skip:number, limit:number, NameProduct:string, category:string):Promise<ProductsDTO[]>{
        let query = {Status:true}
        if( NameProduct ) query["NameProduct"] = {$regex:NameProduct, $options:"i"};
        if( category ) query["Category"] = {$regex:category, $options:"i"};
        
        const products = await this.productsModel.find(query)
        .skip(skip).limit(limit).sort({Timestamp:1});
        return products;
    }    

    async saveProduct(product:ProductsDTO){
        const newProduct = new this.productsModel(product);
        return await newProduct.save()
    }    

    async findProduct(idProduct:string){
        
        const product = await this.productsModel.findOne({idProduct, Status:true});
        
        if(!product) throw new HttpException("PRODUCT NOT FOUND", HttpStatus.NOT_FOUND);

        return product;
    }

    async deleteProduct(idProduct:string){
        const product = await this.findProduct(idProduct);
        
        product.Status = false;
        return await product.save();
    }

    async updateProduct(product:ProductsDTO){
        let exit = await this.findProduct(product.idProduct);
        exit.NameProduct = product.NameProduct;
        exit.Category = product.Category;
        exit.Description = product.Description;
        exit.ProductQuantity = product.ProductQuantity;
        return await exit.save()
        
    }

}

