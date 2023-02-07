import { GET_CAR_YEARS } from "@/services/gql/carYearQueries";
import client from "@/apollo/index";
import get from "lodash.get";
import {
  CarYearsQueryResponseWrapperType,
  CarYearQueryResponseType,
  CarYearType,
} from "@/Types/CarYear";

const getCarYearsArray = (
  obj: CarYearsQueryResponseWrapperType
): CarYearQueryResponseType[] => get(obj, "years.data", []);

export const getCarYears = async (): Promise<CarYearType[]> => {
  const { data = {} } = await client.query({ query: GET_CAR_YEARS });
  return getCarYearsArray(data).map(
    (yearWithAttributes: CarYearQueryResponseType) => ({
      id: get(yearWithAttributes, "id"),
      value: get(yearWithAttributes, "attributes.value"),
    })
  );
};
