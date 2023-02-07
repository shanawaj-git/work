import { CarMakerTypeQueryResponse } from "./CarMaker";

export interface CarMakerAndModelsQueryResponse {
  makers: {
    data: Array<CarMakerTypeQueryResponse>;
  };
}

export interface FlattenedMakerAndModel {
  id: string;
  name: string;
  image?: string;
  makerModelName: string;
  makerName: string;
}
