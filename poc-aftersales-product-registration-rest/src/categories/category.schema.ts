import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Transform, Type} from "class-transformer";
import {Document, ObjectId} from "mongoose";
import * as mongoose from "mongoose";
import {Brand} from "../brands/brands.schema";

export type CategoryDocument = Category & Document;

@Schema()
export class Category{

    @Transform(({value}) => value.toString())
    _id: ObjectId

    @Prop()
    category: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Brand.name })
    @Type(() => Brand)
    brandType: Brand;

}

const CategorySchema = SchemaFactory.createForClass(Category)

CategorySchema.index({category: 'text'})

export { CategorySchema }