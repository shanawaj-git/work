import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Transform, Type} from "class-transformer";
import {Document, ObjectId} from "mongoose";
import * as mongoose from "mongoose";
import {Category} from "../categories/category.schema";
import {Brand} from "../brands/brands.schema";
import {ProductType} from "../productypes/productType.schema";

export type ModelTypeDocument = ModelType & Document;

@Schema()
export class ModelType{

    @Transform(({value}) => value.toString())
    _id: ObjectId

    @Prop()
    modelNo: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Category.name })
    @Type(() => Category)
    categoryType: Category;


    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Brand.name })
    @Type(() => Brand)
    brandType: Brand;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: ProductType.name })
    @Type(() => ProductType)
    productType: ProductType;

}

 const ModelTypeSchema = SchemaFactory.createForClass(ModelType)

ModelTypeSchema.index({model : 'text'});

export { ModelTypeSchema }