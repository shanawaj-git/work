import {IsMongoId, IsOptional} from 'class-validator';
import { ObjectID } from 'typeorm';

export class MongodbCredentialsDto {

    @IsMongoId()
    @IsOptional()
    public brand: ObjectID;

    @IsMongoId()
    @IsOptional()
    public category: ObjectID;

    @IsMongoId()
    @IsOptional()
    public type: ObjectID
}