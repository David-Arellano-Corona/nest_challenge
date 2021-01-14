import { IsString,IsNumber, IsNotEmpty, IsOptional,MinLength, MaxLength,IsEnum,Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Category } from '../../commons/category.enum';

export class ProductsDTO{
    @IsOptional()
    @IsString()
    @ApiProperty({
        type:String,
        description:"idProduct es utilizado para la actualizaciòn de productos(para las demas API's es opcional)",
        required:false
    })
    idProduct?:string;
    @IsString()
    @IsNotEmpty()
    @MinLength(150,{
        message:"La longitud del Nombre del producto debe ser mayor o igual a 150 caracteres"
    })
    @ApiProperty({
        description:"La longitud del Nombre del producto debe ser mayor o igual a 150 caracteres",
        type:String
    })
    NameProduct:string;

    @IsString()
    @IsNotEmpty()
    @IsEnum(Category,{
        message:`Category debe ser uno de los valores permitidos ${Category.BEBIDAS}, ${Category.BOTANAS},${Category.CREMERIA} o ${Category.LIMPIEZA}
    `})
    @ApiProperty({
        description:`Category debe ser uno de los valores permitidos ${Category.BEBIDAS}, ${Category.BOTANAS},${Category.CREMERIA} o ${Category.LIMPIEZA}
        `,
        enum:String
    })     
    Category:Category|String;

    @IsString()
    @IsNotEmpty()
    @MinLength(450,{
        message:"La longitud de la descripciòn del producto deber ser mayor o igual a 450 caracteres"
    })
    @ApiProperty({
        type:String,
        description:"La longitud de la descripciòn del producto deber ser mayor o igual a 450 caracteres"
    })
    Description:string;
    @IsNumber()
    @IsNotEmpty()
    @Min(0,{message:"El valor mínimo para ProductQuantity es 0"})
    @Max(100,{
        message:"EL valor màximo para ProductQuantity debe ser menor a 100"
    })
    @ApiProperty({
        type:Number,
        description:"ProducQuantity acepta un valor dentro del rango 1 - 100"
    })
    ProductQuantity:number;
}