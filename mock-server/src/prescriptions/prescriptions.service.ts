import { Injectable } from '@nestjs/common';
import * as MOCKED_RESPONSE from './data/prescriptions.json';

@Injectable()
export class PrescriptionsService {
  
  getAll() {
    return MOCKED_RESPONSE;
  }
}
