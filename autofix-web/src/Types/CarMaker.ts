import { CarModelType, CarModelTypeQueryResponse } from "./CarModel";

export interface CarMakerType {
  id: string;
  name: string;
  logo: string;
  models?: Array<CarModelType>;
}

export interface CarMakerTypeQueryResponse {
  id: string;
  attributes: {
    logo: string;
    name: string;
    models?: {
      data: Array<CarModelTypeQueryResponse>;
    };
  };
}
