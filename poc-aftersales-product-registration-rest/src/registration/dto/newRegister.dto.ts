import {
    ArrayMaxSize,
    ArrayMinSize, IsDate, IsDateString,
    IsEmail, IsMongoId,
    IsNotEmpty,
    IsOptional,
    IsString, Matches, Validate,
    ValidateIf,
    ValidateNested
} from "class-validator";



import {Transform, Type as ValidateType} from 'class-transformer'
import {ApiProperty} from "@nestjs/swagger";
import {ObjectId} from "mongoose";
import {common} from "../../common/common";


export class Address{


    @IsNotEmpty({message: 'Name field is mandatory'})
    @IsString({message: 'Should be only text'})
    @Matches(/^[a-z ,.'-]+$/i, {message: 'Name can only be text'})
    fullName: string


    @IsOptional({message: 'Email is optional'})
    // @IsEmail({message: 'Invalid email'})
    readonly email: string

    @IsString()
    @IsNotEmpty()
    @Matches(/^971(\d{9})?$/,{message: 'Phone Number should be in the format 9715xxxxxxxx'})
    readonly phone: string;

}

export class Product{

    @IsNotEmpty({ message: "Brand is mandatory."})
    @IsMongoId({message: 'Selected brand is not valid or not found.'})
    brand: ObjectId

    @IsMongoId({message: 'Selected category is not valid or not found.'})
    @IsNotEmpty({ message: "Category is mandatory."})
    category: ObjectId

    @IsMongoId({message: 'Selected product type is not valid or not found.'})
    @IsNotEmpty({ message: "Product Type is mandatory."})
    type: ObjectId

    @IsMongoId({message: 'Selected model is not valid or not found'})
    @IsNotEmpty({ message: "Model Number is mandatory."})
    model: ObjectId


    @IsOptional()
    @Matches(/^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/, {message: "Date should be in the format DD-MM-YYYY"})
    // @Transform(x => new Date(x.value))
    invoiceDate: Date

    @IsOptional()
    serialnumber: string

}

export class NewRegisterDto{

    // customer: registrationSchema;
    @ApiProperty({description:"address", required: true, type: [Address]})
    // @ArrayMinSize(1)

    @ValidateNested({  each: false})
    @ValidateType(() => Address)
    public customer?: Address;

    @ApiProperty({description:"product", required: true, type: [Product]})
    // @ArrayMinSize(1)
    @ValidateNested()
    @ValidateType(() => Product)
    public product?: Product;

}

export default NewRegisterDto;