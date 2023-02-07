import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PrescriptionsService } from './prescriptions.service';
import { v4 as uuidv4 } from 'uuid';
import { ProducerService } from './../kafka/producer';
import { CreatePrescriptionsDto } from './dto/prescription.dto';
import constantConfig from "./../config/constants"
const prescriptionTopic = constantConfig.KAFKA_PRESCRIPTION_TOPIC;

@ApiTags('prescriptions')
@Controller('prescriptions')
export class PrescriptionsController {

  constructor(
    private readonly prescriptionService: PrescriptionsService,
    private readonly producer: ProducerService
    ){}

  @Get()
  @ApiOperation({
    summary: 'Return all prescriptions and send these to kafka one by one',
  })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiResponse({ status: 200, description: 'Return all prescriptions' })

  async findAll() {
    let data = this.prescriptionService.getAll();
    const prescriptions=[];
    data.forEach((prescription)=>{
      let prescriptionEvent = this.producer.produce({
        topic: prescriptionTopic,
        messages: [
          {
            value: JSON.stringify(prescription),
          },
        ],
      });
      prescriptions.push(prescriptionEvent)
    })
    await Promise.all(prescriptions)
    return data;
  }

  @Get(':eid')
  @ApiOperation({
    summary: 'Returns a prescription details by EID and send it to kafka.',
  })
  @ApiResponse({
    status: 200,
    description: 'Get prescription by its id and send it to kafka',
  })
  @ApiResponse({ status: 500, description: 'Internal server error' })

  async findOne(@Param('eid') eid: string) {
    let prescription = this.prescriptionService.getAll().find((presc) => {
      return presc.patient.EID === eid;
    });
    if (prescription) {
      await this.producer.produce({
        topic: prescriptionTopic,
        messages: [
          {
            value: JSON.stringify(prescription),
          },
        ],
      });
    }

    return prescription;
  }
  getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  @Post()
  @ApiOperation({ summary: 'Mock a prescription and send it to kafka' })
  @ApiResponse({
    status: 200,
    description: 'Returns prescription based on the given input',
  })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async mock(@Body() mock: CreatePrescriptionsDto) {
    let prescriptions = this.prescriptionService.getAll();
    let randomNumber = this.getRandomInt(prescriptions.length);
    const randomPrescription = prescriptions[randomNumber];
    Object.keys(mock).forEach((element) => {
      if (randomPrescription[element]) {
        randomPrescription[element] = mock[element];
      }
    });
    randomPrescription.prescriptionNumber = uuidv4();
    await this.producer.produce({
        topic: prescriptionTopic,
        messages: [
          {
            value: JSON.stringify(randomPrescription),
          },
        ],
      });
    return randomPrescription
  }
}
