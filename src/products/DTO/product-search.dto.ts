import {IsOptional,IsNotEmpty} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Category } from '../../commons/category.enum';
export class ProductSearchDTO{
    @IsNotEmpty()
    @ApiProperty({
        type:String,
        description:"Indica el número de la paginación actual de la tabla"
    })
    Page?:string;

    @IsNotEmpty()
    @ApiProperty({
        type:String,
        description:"Indica el número máximo de registros que se mostrará en la tabla"
    })
    Limit?:string;

    @IsOptional()
    @ApiProperty({
        type:String,
        description:"Indica el valor que se aplicará al filtro, este campo es opcionla ",
        required:false
    })
    NameProduct?:string;
    @IsOptional()
    @ApiProperty({
        type:String,
        description:"Indica el valor que se aplicará al filtro, este campo es opcionla",
        required:false
    })
    Category?:Category
}