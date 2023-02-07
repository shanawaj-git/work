import React, { useState } from "react";
import Section from "@/components/Section";
import PageHeader from "@/components/PageHeader/PageHeader";
import { Article, Button, utils } from "@albathanext/design-system";
import BackArrow from "@/assets/arrow-back-icon.svg";
import TimeIcon from "@/assets/time-icon.svg";
import { FormattedMessage, useIntl } from "react-intl";
import { useRouter } from "next/router";
import CarMaker from "@/components/CarMaker/CarMaker";
import { useQuery } from "@apollo/client";
import { GET_CAR_MAKERS_AND_MODELS } from "@/services/gql/carMakerAndModelQueries";
import { CarMakerType, CarMakerTypeQueryResponse } from "../../Types/CarMaker";
import { StyledTextField } from "@/containers/CarSelection/StyledComponents";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@/assets/search-icon.svg";
import ResetIcon from "@/assets/reset-icon.svg";
import Loading from "@/components/Loading/Loading";
import {
  CarMakerAndModelsQueryResponse,
  FlattenedMakerAndModel,
} from "../../Types/CarMakerAndModels";
import { CarModelType, CarModelTypeQueryResponse } from "../../Types/CarModel";
import { groupBy, includesCaseInsensitive } from "@/utils/index";
import get from "lodash.get";
import EmptyPage from "@/components/EmptyPage/EmptyPage";
import { YEAR_SELECTION } from "@/app/config";

const CarSelection = () => {
  const router = useRouter();
  const reduceCarsData = (
    cars: CarMakerAndModelsQueryResponse
  ): Array<CarMakerType> => {
    return get(cars, "makers.data").map(
      (maker: CarMakerTypeQueryResponse): CarMakerType => ({
        id: get(maker, "id"),
        name: get(maker, "attributes.name"),
        logo: get(maker, "attributes.logo"),
        models: get(maker, "attributes.models.data").map(
          (model: CarModelTypeQueryResponse): CarModelType => ({
            id: get(model, "id"),
            name: get(model, "attributes.name"),
            image: get(model, "attributes.image.data"),
          })
        ),
      })
    );
  };

  const flattenData = (
    data: Array<CarMakerType>
  ): Array<FlattenedMakerAndModel> => {
    return data
      .map((maker) => {
        if (maker.models) {
          return maker.models.flat().map((model: CarModelType) => ({
            id: model?.id as string,
            name: model?.name as string,
            image: model?.image as string,
            makerModelName: `${maker.name}|${model?.name}`,
            makerName: maker.name,
          }));
        }
        return [];
      })
      .flat();
  };

  const [searchText, setSearchText] = useState("");
  const [flattenedCarsData, setFlattenedCarsData] = useState<
    Array<FlattenedMakerAndModel>
  >([]);
  const [carMakersAndModels, setCarMakersAndModels] = useState<CarMakerType[]>(
    []
  );

  const { loading, error } = useQuery(GET_CAR_MAKERS_AND_MODELS, {
    variables: {
      page: 100,
    },
    onCompleted: (data) => {
      const reduceData = data.makers.data && reduceCarsData(data);
      setCarMakersAndModels(reduceData);
      setFlattenedCarsData(flattenData(reduceData));
    },
  });
  if (loading) return <Loading />;
  if (error) return <div>`Error! ${error.message}`</div>;

  const filterData = (text: string): Array<CarMakerType> => {
    const filteredData = flattenedCarsData.filter(
      (item: FlattenedMakerAndModel) =>
        includesCaseInsensitive(item.makerModelName, text)
    );
    return unFlattenData(filteredData);
  };

  const unFlattenData = (
    array: Array<FlattenedMakerAndModel>
  ): Array<CarMakerType> => {
    const groupedData = groupBy(
      array,
      (model: FlattenedMakerAndModel) => model.makerName
    );
    return Object.keys(groupedData).map((makerName: string) => {
      const carMaker = carMakersAndModels.find(
        (e: CarMakerType) => e.name === makerName
      )!!;
      return {
        ...carMaker,
        models: groupedData[makerName],
      };
    });
  };

  const onModelSelectionHandler = (makerId: string, modelId: string) => {
    router.push({ pathname: YEAR_SELECTION, query: { makerId, modelId } });
  };

  const filteredCarData = filterData(searchText);

  return (
    <Section className="flex flex-col h-screen" data-testid="CarSelection">
      <PageHeader>
        <HeaderChildren searchText={searchText} setSearchText={setSearchText} />
      </PageHeader>
      <div
        className="flex-1 h-full p-6 pt-0 overflow-scroll overflow-y-scroll"
        data-testid="CarMakers"
      >
        {filteredCarData.length > 0 ? (
          filteredCarData.map((carMaker: CarMakerType) => (
            <CarMaker
              data={carMaker}
              key={carMaker.id}
              onModelSelection={onModelSelectionHandler}
            />
          ))
        ) : (
          <EmptyPage className="flex items-center justify-center w-full h-full">
            <p>No Data Available</p>
          </EmptyPage>
        )}
      </div>
    </Section>
  );
};

interface HeaderChildrenProps {
  searchText: string;
  setSearchText: Function;
}

const HeaderChildren = ({ ...props }: HeaderChildrenProps) => {
  const { searchText, setSearchText } = props;
  const router = useRouter();
  const intl = useIntl();

  const handleOnClick = () => {
    router.back();
  };

  const resetSearchText = () => {
    setSearchText("");
  };

  return (
    <div>
      <Button
        data-testid={"car-selection-back-button"}
        className="mb-5 min-w-[40px] min-h-[40px] w-[40px] h-[40px]"
        style={{
          borderColor: "rgba(220, 220, 220, 0.2)",
          backgroundColor: utils.colorSelector("P700"),
        }}
        onClick={handleOnClick}
      >
        <img src={BackArrow} alt="BackArrow" />
      </Button>
      <Article
        title={<FormattedMessage id="carSelection.header.title" />}
        titleProps={{
          color: utils.colorSelector("P200"),
          className: "text-xl whitespace-pre-line !mt-4",
        }}
      />
      <StyledTextField
        placeholder="Search by brand or model of your car"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <img src={SearchIcon} alt="SearchIcon" />
            </InputAdornment>
          ),
          endAdornment: searchText && (
            <InputAdornment
              position="end"
              onClick={resetSearchText}
              data-testid="search-reset"
            >
              <img src={ResetIcon} alt="ResetIcon" />
            </InputAdornment>
          ),
        }}
        inputProps={{ "data-testid": "carSelection-search" }}
      />
      <div
        className="flex p-2 mt-3 align-middle"
        style={{ backgroundColor: "#E3F6071A", borderRadius: "4px" }}
      >
        <img src={TimeIcon} alt={TimeIcon} />
        <a
          className="pl-2 font-[500] text-[14px] leading-6 text-left tracking-[.03px]"
          style={{
            color: utils.colorSelector("P300"),
          }}
        >
          {intl.formatMessage({ id: "carSelection.vin.link" })}
        </a>
      </div>
    </div>
  );
};

export default CarSelection;
