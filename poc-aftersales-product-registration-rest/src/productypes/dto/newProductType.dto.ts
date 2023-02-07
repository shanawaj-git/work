import {IsNotEmpty, IsString} from "class-validator";


export class NewProductTypeDto {

    @IsString()
    @IsNotEmpty()
    product: string;

}

export default NewProductTypeDto;
