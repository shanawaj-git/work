import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Transform} from "class-transformer";
import {Document, ObjectId} from "mongoose";


export type BrandDocument = Brand & Document;

@Schema()
export class Brand{

    @Transform(({value}) => value.toString())
    _id: ObjectId

    @Prop()
    brand: string;



}

const BrandSchema = SchemaFactory.createForClass(Brand)

BrandSchema.index({brand: 'text'});

export { BrandSchema }