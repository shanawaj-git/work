import { ServiceType } from "@/services/common";
import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { Button, Article, utils } from "@albathanext/design-system";
import Section from "@/components/Section/";
import { ServiceCard } from "./styledComponents";
import icon from "@/assets/icon.svg";

export const Intro: NextPage<{ services: ServiceType[] }> = ({ services }) => {
  return (
    <Section
      data-testid="intro-section"
      style={{
        background: utils.colorSelector("p600"),
      }}
      className="flex flex-col justify-between py-[100px] text-white bg-cover bg-no-repeat"
    >
      <div className="px-6">
        <Article
          title={<FormattedMessage id="home.intro.title" />}
          description={<FormattedMessage id="home.intro.description" />}
          divider
          dividerProps={{
            className: "mt-2",
            style: {
              borderColor: utils.colorSelector("P300"),
            },
          }}
          titleProps={{
            className: "text-4xl whitespace-pre-line",
            color: "white",
          }}
          descriptionProps={{
            className: "text-base",
            color: utils.colorSelector("p500"),
          }}
        />
      </div>

      <ServiceSlider services={services} />

      <div className="w-full px-6">
        <Button variant="contained" fullWidth size="medium">
          <FormattedMessage id="home.intro.button.help" />
        </Button>
      </div>
    </Section>
  );
};

export default Intro;

interface ServiceSliderType {
  services: ServiceType[];
}

const ServiceSlider = ({ services }: ServiceSliderType) => {
  const serviceCardMap = (ServiceCards: ServiceType[]) =>
    ServiceCards.map((service: ServiceType) => {
      return (
        <>
          <ServiceCard
            className="ml-2"
            key={`intro-section-1-${service.name}`}
            cardIcon={service.icon || icon}
            title={service.name}
          />
        </>
      );
    });

  const serviceMap = (Services: ServiceType[][]) => {
    return Services.map((e: ServiceType[], i: number) => {
      return (
        <div
          key={"service-" + i}
          className="flex items-center w-full space-x-5 overflow-none "
        >
          {serviceCardMap(e)}
        </div>
      );
    });
  };

  const [_splitService, setSplitterService] = useState<ServiceType[][]>([]);
  useEffect(() => {
    const _services: ServiceType[] = services || [];
    const zero = 0;
    const lengthOfServices: number = Math.floor(_services?.length / 3);
    const fistRow: ServiceType[] = _services.splice(zero, lengthOfServices);
    const secondRow: ServiceType[] = _services.splice(zero, lengthOfServices);
    const thirdRow: ServiceType[] = _services.splice(zero, lengthOfServices);
    setSplitterService([fistRow, secondRow, thirdRow]);
  }, [services]);

  return (
    <div className="flex flex-col w-full my-10 space-y-5 overflow-auto">
      {serviceMap(_splitService)}
    </div>
  );
};
