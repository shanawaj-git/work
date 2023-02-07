import {IsMongoId, IsNumber, IsOptional, Min} from "class-validator";
import {Type} from "class-transformer";


export class PaginationParams{
    @IsOptional()
    @IsMongoId()
    startId?: string

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    page?: number

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    pageSize?: number


}