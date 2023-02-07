import { CarMakerTypeQueryResponse } from "./CarMaker";
export interface CarModelType {
  id: string;
  name: string;
  image?: string;
}

export interface CarModelTypeQueryResponse {
  id: string;
  attributes: {
    image?: string;
    name: string;
    makerId?: {
      data: CarMakerTypeQueryResponse;
    };
  };
}
