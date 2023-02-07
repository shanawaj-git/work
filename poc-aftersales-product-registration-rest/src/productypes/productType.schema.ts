import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document,ObjectId} from "mongoose";
import {Transform, Type} from "class-transformer";
import {Category} from "../categories/category.schema";
import * as mongoose from "mongoose";
import {Brand} from "../brands/brands.schema";


export type ProductTypeDocument = ProductType & Document;

@Schema()
export class ProductType{

    @Transform(({value}) => value.toString())
    _id: ObjectId

    @Prop()
    product: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Category.name })
    @Type(() => Category)
    categoryType: Category;


    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Brand.name })
    @Type(() => Brand)
    brandId: Brand;


}

const ProductTypeSchema = SchemaFactory.createForClass(ProductType)


ProductTypeSchema.index({product: 'text'});

export { ProductTypeSchema }

