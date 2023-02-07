import PageHeader from "@/components/PageHeader/PageHeader";
import Section from "@/components/Section";
import { Article, Button, utils } from "@albathanext/design-system";
import React, { ReactElement, useCallback, useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import BackArrow from "@/assets/arrow-back-icon.svg";
import EditIcon from "@/assets/edit.svg";
import { useRouter } from "next/router";
import { LabelType } from "@/services/common";
import { CarType } from "@/Types/Car";
import { getCarDetails } from "@/services/carOverview";
import get from "lodash.get";
import Loading from "@/components/Loading/Loading";
import { localStorage } from "@/utils/storage/LocalStorage";
import { CAR_SELECTION, RECOMMENDED_MAINTENANCE } from "@/app/config";
export const pageName = "car.overview";
export const USER_SELECTED_CAR_DETAILS = "user_selected_car_details";
interface CarDetailType extends CarType {
  mileage: string;
}

export interface CarOverviewSelectionPropsType {
  en?: { labels: LabelType[] };
  ar?: { labels: LabelType[] };
}

const CarOverview = () => {
  const router = useRouter();
  const [selectedCar, setSelectedCar] = useState<CarDetailType>();
  const [loading, setLoading] = useState<boolean>(false);
  const intl = useIntl();

  const getSelectedCarDetails = useCallback(async () => {
    setLoading(true);
    const { modelId, yearId, engineId, mileage } = router.query;

    const car: CarType = await getCarDetails({
      modelId: modelId as string,
      yearId: yearId as string,
      engineId: engineId as string,
    });

    const carDetails = {
      ...car,
      mileage: mileage as string,
      ...(!engineId && {
        engineType: {
          id: engineId as string,
          name: intl.formatMessage({ id: "car.overview.engine.none" }),
        },
      }),
    };
    setSelectedCar(carDetails);

    setLoading(false);
  }, [router.query]);

  useEffect(() => {
    if (router.isReady) {
      getSelectedCarDetails();
    }
  }, [router.isReady, getSelectedCarDetails]);

  const handleOnClickBack = () => {
    router.back();
  };

  const onEditClickHandler = () => {
    router.push(CAR_SELECTION);
  };

  const onCarConfirmationHandler = () => {
    const { setItem } = localStorage();
    setItem(USER_SELECTED_CAR_DETAILS, JSON.stringify(selectedCar));
    router.push(RECOMMENDED_MAINTENANCE);
  };

  const getNameOfTheCar = (
    make: string,
    model: string,
    year: string | number
  ): string => {
    return `${make} ${model} ${year}`;
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Section
      className={`flex flex-col  h-screen`}
      style={{
        backgroundColor: utils.colorSelector("C500"),
      }}
      data-testid={`${pageName}`}
    >
      <PageHeader>
        <Button
          data-testid={`${pageName}-back-button`}
          className={`mb-5 min-w-[40px] min-h-[40px] w-[40px] h-[40px]`}
          style={{
            borderColor: "rgba(220, 220, 220, 0.2)",
            backgroundColor: utils.colorSelector("P700"),
          }}
          onClick={handleOnClickBack}
        >
          <img src={BackArrow} alt="BackArrow" />
        </Button>
        <Article
          title={<FormattedMessage id={`${pageName}.header.title`} />}
          titleProps={{
            color: utils.colorSelector("P200"),
            className: "text-xl whitespace-pre-line !mt-4",
          }}
          description={<FormattedMessage id={`${pageName}.header.subTitle`} />}
          descriptionProps={{
            className: "text-white/[0.8] text-sm mt-[12px]",
          }}
        />
      </PageHeader>

      <div
        className="flex flex-col items-center justify-center"
        style={{ backgroundColor: utils.colorSelector("C500") }}
      >
        <div className="mx-[28px] mt-[52px]">
          <img
            data-testid="car-image"
            src={get(selectedCar, "image")}
            width="320px"
            height="166px"
            alt={`vehicle image`}
          />
        </div>

        <div className="flex mt-[54px] px-[20px] justify-between w-full">
          <div
            data-testid="car-make-model-year"
            className="w-[245px] text-[24px] font-semibold"
          >
            {getNameOfTheCar(
              get(selectedCar, "maker.name", ""),
              get(selectedCar, "model.name", ""),
              get(selectedCar, "year.value", "")
            )}
          </div>
          <div className="w-[41px] h-[27px] pt-1">
            <img
              data-testid="car-make-logo"
              src={get(selectedCar, "maker.logo")}
              alt={`${get(selectedCar, "maker.name")} logo`}
            />
          </div>
        </div>

        <div className="flex px-[20px] w-full my-[20px]">
          <div className="flex flex-col w-1/2">
            <CarOverviewItemComponent
              itemName="car-engine-type"
              label={<FormattedMessage id={`${pageName}.details.engine`} />}
              value={`${get(selectedCar, "engineType.name", "")}`}
            />
          </div>
          <div className="flex flex-col w-1/2 border-l-2 pl-[20px]">
            <CarOverviewItemComponent
              itemName="car-mileage"
              label={<FormattedMessage id={`${pageName}.details.mileage`} />}
              value={`${get(selectedCar, "mileage", "0")} km`}
            />
          </div>
        </div>

        <div className="flex px-[20px] w-full my-[47px]">
          <div className="w-1/2 text-[14px] font-semibold pt-[15px] cursor-pointer">
            <div
              data-testid="edit-car-details-link"
              className="inline-block text-[#2E4341]"
              onClick={onEditClickHandler}
            >
              <FormattedMessage id={`${pageName}.details.edit`} />
              <img
                className="inline-block px-[4px] pb-[2px]"
                src={EditIcon}
                alt="edit icon"
              />
            </div>
          </div>
          <div className="w-1/2">
            <Button
              data-testid={`${pageName}-button-confirm`}
              variant="contained"
              fullWidth
              size="medium"
              className="!text-[13px] !px-[17.25px] !normal-case whitespace-nowrap font-semibold"
              onClick={onCarConfirmationHandler}
            >
              <FormattedMessage id={`${pageName}.button.confirm`} />
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
};

interface CarOverviewItemComponentType {
  itemName: string;
  label: string | ReactElement;
  value: string;
}

const CarOverviewItemComponent = ({
  itemName,
  label,
  value,
}: CarOverviewItemComponentType) => {
  return (
    <>
      <div
        data-testid={`${itemName}-label`}
        className="text-[16px] text-black/60 font-light"
      >
        {label}
      </div>
      <div data-testid={itemName} className="text-[20px] font-normal">
        {value}
      </div>
    </>
  );
};

export default CarOverview;
