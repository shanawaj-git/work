import {IsNotEmpty, IsNumber, IsString} from "class-validator";


export class NewModelDto{

    @IsString()
    @IsNotEmpty()
    modelNo: string;
}

export default NewModelDto;