import { ApiProperty } from '@nestjs/swagger';

export class CreatePrescriptionsDto {

  @ApiProperty({required:false})
  recordNumber: string;

  @ApiProperty({required:false})
  visitDate: string;

  @ApiProperty({required:false})
  diagnosis: string;

  @ApiProperty({required:false})
  pin: string;
  
  @ApiProperty({required:false})
  patient:object;

  @ApiProperty({required:false})
  doctor:object;

  @ApiProperty({required:false})
  drugs: Array<object>
}