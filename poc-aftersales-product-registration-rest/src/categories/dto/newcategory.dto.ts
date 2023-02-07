import {IsNotEmpty, IsString} from "class-validator";
import {ObjectId} from "mongoose";


export class NewcategoryDto {

    @IsString()
    @IsNotEmpty()
    category: string;
    //
    // @IsNotEmpty()
    // brandId: ObjectId
}

export default NewcategoryDto;