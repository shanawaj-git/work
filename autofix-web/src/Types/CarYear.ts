export interface CarYearQueryResponseType {
  id: string;
  attributes: {
    value: number;
  };
}

export interface CarYearsQueryResponseWrapperType {
  years: {
    data: CarYearQueryResponseType[];
  };
}

export interface CarYearType {
  id: string;
  value: number;
}
