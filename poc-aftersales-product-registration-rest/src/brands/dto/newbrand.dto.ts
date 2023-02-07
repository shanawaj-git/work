import {IsNotEmpty, IsString} from "class-validator";

export class  NewbrandDto{

    @IsString()
    @IsNotEmpty()
    brand: string;
}

export default NewbrandDto;