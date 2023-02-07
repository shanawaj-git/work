import {Document, ObjectId} from "mongoose";
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Transform, Type} from "class-transformer";
import * as mongoose from "mongoose";
import {Brand} from "../brands/brands.schema";
import {ProductType} from "../productypes/productType.schema";
import {Category} from "../categories/category.schema";
import {ModelType} from "../models/model.schema";


export type RegisterTypeDocument = RegistrationType & Document;

@Schema({
    timestamps: true,
})
export class RegistrationType {


    @Transform(({value}) => value.toString())
    _id: ObjectId

    @Prop()
    fullName: string;

    @Prop()
    email: string;

    @Prop()
    phone: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Brand.name })
    @Type(() => Brand)
    brandType: Brand;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: ProductType.name })
    @Type(() => ProductType)
    productType: ProductType;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Category.name })
    @Type(() => Category)
    categoryType: Category;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: ModelType.name })
    @Type(() => ModelType)
    modelType: ModelType

    @Prop()
    serialNumber: string;

    @Prop()
    date: string;



}
 const RegistrationFullSchema = SchemaFactory.createForClass(RegistrationType)

RegistrationFullSchema.index({register: 'text'})

export { RegistrationFullSchema }