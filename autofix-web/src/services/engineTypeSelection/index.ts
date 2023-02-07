import { getCarsByModelIdAndYearId } from "@/services/carOverview";
import { CarEngineType } from "@/Types/CarEngine";
import { CarType } from "@/Types/Car";
import get from "lodash.get";

const getCarEngineTypes = (cars: CarType[]): CarEngineType[] => {
  return cars.map((car) => get(car, "engineType"));
};

export const getCarEngineTypesByModelIdAndYearId = async (
  modelId: string,
  yearId: string
): Promise<CarEngineType[]> => {
  const cars: CarType[] = await getCarsByModelIdAndYearId(modelId, yearId);
  return getCarEngineTypes(cars);
};
