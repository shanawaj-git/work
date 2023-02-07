import { CarMakerType } from "./CarMaker";
import { CarYearType, CarYearQueryResponseType } from "./CarYear";
import { CarModelType, CarModelTypeQueryResponse } from "./CarModel";
import { CarEngineQueryResponseType, CarEngineType } from "./CarEngine";

export interface CarsQueryResponseWrapperType {
  cars: {
    data: CarQueryResponseType[];
  };
}

export interface CarQueryResponseType {
  attributes: {
    engine_type: {
      data: CarEngineQueryResponseType;
    };
    model: {
      data: CarModelTypeQueryResponse;
    };
    year: {
      data: CarYearQueryResponseType;
    };
    image?: string;
  };
}

export interface CarType {
  maker: CarMakerType;
  model: CarModelType;
  year: CarYearType;
  engineType: CarEngineType;
  image: string;
}
