import mongoose,{ Schema, Document } from 'mongoose';
import { v4 as uuid } from 'uuid';
import { Category } from '../../commons/category.enum';


export const ProductsSchema = new Schema({
    idProduct:{type:String, default:uuid},
    NameProduct:{type:String, minlength:150 , required:true},
    Category:{type:String },
    Description:{type:String, required:true, minlength:140},
    ProductQuantity:{type:Number, required:true},
    Status:{type:Boolean, required:true, default:1},
    Timestamp:{type:Date, default:Date.now()}
},{
    toJSON:{
        transform(doc, ret){
            delete ret._id;
            delete ret.__v;
        }
    }
})

export interface Products extends Document{
    idProduct:string,
    NameProduct:string,
    Category:String,
    Description:string,
    ProductQuantity:number,
    Status:boolean,
    Timestamp:Date
}