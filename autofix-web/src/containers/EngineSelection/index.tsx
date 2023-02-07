import Section from "@/components/Section";
import React, { useCallback, useEffect, useState } from "react";
import { Article, Button, utils } from "@albathanext/design-system";
import PageHeader from "@/components/PageHeader/PageHeader";
import { useRouter } from "next/router";
import { FormattedMessage } from "react-intl";
import BackArrow from "@/assets/arrow-back-icon.svg";
import ItemCardWithAction from "@/components/ItemCardWithAction/ItemCardWithAction";
import { LabelType } from "@/services/common";
import { getCarEngineTypesByModelIdAndYearId } from "@/services/engineTypeSelection";
import { CarEngineType } from "@/Types/CarEngine";
import { DEFAULT_ENGINE_ID } from "@/services/carOverview";
import { MILEAGE_SELECTION } from "@/app/config";

export const pageName = "engine.selection";

export interface EngineSelectionPropsType {
  en?: { labels: LabelType[] };
  ar?: { labels: LabelType[] };
}

const DEFAULT_OPTION_ID = "-1";

const EngineSelection = () => {
  const router = useRouter();
  const [engineTypes, setEngineTypes] = useState<CarEngineType[]>([]);

  const getEngineTypes = useCallback(async () => {
    const { modelId, yearId } = router.query;
    if (modelId && yearId) {
      const engineTypes = await getCarEngineTypesByModelIdAndYearId(
        modelId as string,
        yearId as string
      );

      setEngineTypes(engineTypes);
    }
  }, [router.query]);

  useEffect(() => {
    if (router.isReady) {
      getEngineTypes();
    }
  }, [router.isReady, getEngineTypes]);

  const onBackClickHandler = () => {
    router.back();
  };

  const onItemChooseHandler = (engineId: string) => {
    router.push({
      pathname: MILEAGE_SELECTION,
      query: {
        ...router.query,
        ...(engineId !== DEFAULT_ENGINE_ID && { engineId }),
        ...(engineTypes.length === 0 && { yearId: "" }),
      },
    });
  };

  return (
    <Section
      className={`flex flex-col  h-screen`}
      style={{ backgroundColor: utils.colorSelector("C500") }}
      data-testid={`${pageName}`}
    >
      <PageHeader>
        <Button
          data-testid={`${pageName}-back-button`}
          className={`mb-5 min-w-[40px] min-h-[40px] w-[40px] h-[40px]`}
          style={{
            borderColor: utils.colorSelector("b100"),
            backgroundColor: utils.colorSelector("P700"),
          }}
          onClick={onBackClickHandler}
        >
          <img src={BackArrow} alt="BackArrow" />
        </Button>
        <Article
          title={<FormattedMessage id={`${pageName}.header.title`} />}
          titleProps={{
            color: utils.colorSelector("P200"),
            className: "text-xl whitespace-pre-line !mt-4",
          }}
        />
      </PageHeader>

      <div className="m-[24px]">
        {engineTypes.map((engineType: CarEngineType) => (
          <ItemCardWithAction
            key={engineType.id}
            itemId={engineType.id}
            itemText={engineType.name}
            onClick={() => onItemChooseHandler(engineType.id)}
          />
        ))}
        <ItemCardWithAction
          key={DEFAULT_OPTION_ID}
          itemId={DEFAULT_OPTION_ID}
          itemText={<FormattedMessage id={`${pageName}.option.dontknow`} />}
          onClick={() => onItemChooseHandler(DEFAULT_OPTION_ID)}
        />
      </div>
    </Section>
  );
};

export default EngineSelection;
