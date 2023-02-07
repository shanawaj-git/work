import { CarMakerTypeQueryResponse } from "./../../Types/CarMaker";
import { CarYearQueryResponseType } from "./../../Types/CarYear";
import { CarModelTypeQueryResponse } from "./../../Types/CarModel";
import { CarEngineQueryResponseType } from "@/Types/CarEngine";
import client from "@/apollo/index";
import {
  CarQueryResponseType,
  CarsQueryResponseWrapperType,
  CarType,
} from "@/Types/Car";
import get from "lodash.get";
import { GET_CARS } from "../gql/carsQueries";
import pickBy from "lodash.pickby";

export const DEFAULT_ENGINE_ID = "-1";

export const getCarsArray = (
  obj: CarsQueryResponseWrapperType
): CarQueryResponseType[] => get(obj, "cars.data", []);

export const fetchCarsByModelIdAndYearId = async (
  modelId: string,
  yearId: string
): Promise<CarsQueryResponseWrapperType> => {
  const { data = {} } = await client.query({
    query: GET_CARS,
    variables: {
      yearId: parseInt(yearId),
      modelId: parseInt(modelId),
      pageSize: 20,
    },
  });
  return data;
};

const fetchCar = async (
  carDetailsFilter: CarDetailsFilterType
): Promise<CarsQueryResponseWrapperType> => {
  const { data = {} } = await client.query({
    query: GET_CARS,
    variables: carDetailsFilter,
  });
  return data;
};

export const getCarsByModelIdAndYearId = async (
  modelId: string,
  yearId: string
): Promise<CarType[]> => {
  const response: CarsQueryResponseWrapperType =
    await fetchCarsByModelIdAndYearId(modelId, yearId);
  return flattenCarResponse(response);
};

const flattenCarResponse = (
  response: CarsQueryResponseWrapperType
): CarType[] => {
  const cars: CarQueryResponseType[] = getCarsArray(response);
  return cars.map((car: CarQueryResponseType) => {
    const engineType: CarEngineQueryResponseType = get(
      car,
      "attributes.engine_type"
    );
    const model: CarModelTypeQueryResponse = get(car, "attributes.model");
    const maker: CarMakerTypeQueryResponse = get(
      model,
      "data.attributes.makerId"
    );
    const year: CarYearQueryResponseType = get(car, "attributes.year");
    const image: string = get(car, "attributes.image");

    return {
      engineType: {
        id: get(engineType, "data.id"),
        name: get(engineType, "data.attributes.name"),
      },
      model: {
        id: get(model, "data.id"),
        name: get(model, "data.attributes.name"),
      },
      maker: {
        id: get(maker, "data.id"),
        name: get(maker, "data.attributes.name"),
        logo: get(maker, "data.attributes.logo"),
      },
      year: {
        id: get(year, "data.id"),
        value: get(year, "data.attributes.value"),
      },
      image,
    };
  });
};

export interface CarDetailsFilterType {
  modelId?: string;
  yearId?: string;
  engineId?: string;
}

export const getCarDetails = async (
  carDetailsFilter: CarDetailsFilterType
): Promise<CarType> => {
  const head = (cars: CarType[]) => get(cars, "0", {});

  const response: CarsQueryResponseWrapperType = await fetchCar(
    pickBy(carDetailsFilter)
  );
  const carArray = flattenCarResponse(response);
  return head(carArray);
};
