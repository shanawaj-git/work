import type { NextPage } from "next";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import {
  Article,
  Button,
  Map,
  Marker,
  Typography,
  TypographyType,
  utils,
} from "@albathanext/design-system";
import Section from "@/components/Section";
import PageHeader from "@/components/PageHeader/PageHeader";
import { useIntl } from "react-intl";
import BackArrow from "@/assets/arrow-back-icon.svg";
import { StyledTextField } from "@/containers/WorkshopSelection/StyledComponents";
import SearchIcon from "@/assets/search-icon.svg";
import CenterPositionIcon from "@/assets/center-position-icon.svg";
import SidePositionIcon from "@/assets/side-position-icon.svg";
import { renderToString } from "react-dom/server";
import Star from "@/assets/star.svg";
import { AutoCompleteComponent } from "@/components/AutoComplete";
import { getCurrentLocation } from "@/utils/index";
import { debounce } from "lodash";
import {
  BoundPayloadType,
  HeaderChildrenProps,
  MapType,
  LatLngType,
  WorkshopMarkerProps,
  workshopType,
  WorkshopsPayload,
} from "./interfaces";
import { getBoundLocation, markerIcon } from "./utils";
import {
  mapProps,
  ZOOM_LEVELS,
} from "@/containers/WorkshopSelection/constants";
import { getWorkshopsQuery } from "@/services/workshops";

export const pageName = "workshop.selection";
const WorkshopSelection: NextPage = () => {
  const [workshops, setWorkshops] = useState<{ [key: string]: workshopType }>(
    {}
  );
  const [searchText, setSearchText] = useState("");
  const ref = useRef<MapType>({} as MapType);

  const moveMap = ({ lat, lng }: LatLngType) => {
    ref.current.map.panTo({ lat, lng });
  };

  const getWorkshopsQueryLimit = (): number => {
    const currentZoom = ref.current.map.getZoom();
    return currentZoom <= ZOOM_LEVELS.levelToHideAll
      ? -1
      : currentZoom >= ZOOM_LEVELS.levelToDisplayAll
      ? 0
      : Math.floor(currentZoom * 1.5);
  };

  const shouldResetWorkshops = (limit: number) => limit === -1;

  const getWorkshops = async (payload: BoundPayloadType, limit: number) => {
    if (shouldResetWorkshops(limit)) {
      setWorkshops({});
      return;
    }

    const { data, error } = await getWorkshopsQuery(
      buildWorkshopsQueryPayload(payload, limit)
    );

    if (error) {
      console.error("Unable to fetch data by the bound");
    }
    const newData = formatWorkshopsData(data.fetchWorkshops);
    setWorkshops((value) => ({ ...value, ...newData }));
  };

  const formatWorkshopsData = (workshops: [workshopType]) => {
    return workshops.reduce(
      (acc: { [key: string]: workshopType }, curr: workshopType) => {
        acc[curr.id] = curr;
        return acc;
      },
      {}
    );
  };

  const buildWorkshopsQueryPayload = (
    payload: BoundPayloadType,
    limit: number
  ): WorkshopsPayload => ({
    payload: {
      locationBoxBounds: {
        bottomLeft: {
          longitude: payload.locationBoxBounds.bottomLeft.coordinates[0],
          latitude: payload.locationBoxBounds.bottomLeft.coordinates[1],
        },
        topRight: {
          longitude: payload.locationBoxBounds.topRight.coordinates[0],
          latitude: payload.locationBoxBounds.topRight.coordinates[1],
        },
      },
      limit,
    },
  });

  const onBoundChange = async (payload: BoundPayloadType) => {
    const limit = getWorkshopsQueryLimit();
    await getWorkshops(payload, limit);
  };

  useEffect(() => {
    getCurrentLocation()
      .then(({ latitude, longitude }: GeolocationCoordinates) => {
        moveMap({ lat: latitude, lng: longitude });
      })
      .catch(() => {});
  }, []);

  const renderCenterMarker = () => (
    <Marker
      mapInstance={ref?.current?.mapWindowRef}
      initalCordinates={mapProps.initialCoordinates}
      center={true}
      icon={markerIcon(CenterPositionIcon)}
      id={"center-marker"}
      clickable={false}
      draggable={false}
    />
  );

  const renderMarkersFromWorkshops = () =>
    Object.values(workshops).map((workshop: workshopType) => (
      <Marker
        data-testid={"markers"}
        key={workshop.id}
        mapInstance={ref?.current?.mapWindowRef}
        initalCordinates={[
          workshop.address.location.coordinates[1],
          workshop.address.location.coordinates[0],
        ]}
        labelContent={renderToString(
          <WorkshopMarker name={workshop.name} rating={workshop.rating} />
        )}
        icon={markerIcon(SidePositionIcon)}
        center={false}
        labelAnchorCoordinates={
          workshop.name.length > 20 ? [-50, -90] : [-50, -80]
        }
        labelZIndexOffset={0}
        labelClass={"labels"}
        labelStyle={{ opacity: 0.75 }}
        clickable={true}
        draggable={false}
      />
    ));

  const markers = [renderCenterMarker(), ...renderMarkersFromWorkshops()];

  return (
    <Section
      className={`flex flex-col h-screen`}
      style={{ backgroundColor: utils.colorSelector("C500") }}
      data-testid={`${pageName}`}
    >
      <PageHeader>
        <HeaderChildren
          onAddressSelection={moveMap}
          searchText={searchText}
          setSearchText={setSearchText}
        />
      </PageHeader>
      <div className="h-full">
        <Map
          onCenterChange={debounce(() => {
            getBoundLocation({ map: ref.current.map, onBoundChange });
          }, 500)}
          ref={ref}
          initalCordinates={mapProps.initialCoordinates}
          googleMapKey={mapProps.googleMapKey}
          woosMapKey={mapProps.woosMapKey}
        >
          <div>{markers}</div>
        </Map>
      </div>
    </Section>
  );
};

const WorkshopMarker = ({ ...props }: WorkshopMarkerProps) => {
  const { name, rating } = props;
  return (
    <div
      data-testid="marker"
      className="flex flex-col items-center justify-center w-[100px] h-[60px]"
    >
      <span className="text-center justify-center not-italic text-[14px] leading-[1] font-[550] w-25 pb-1">
        {name.length > 20 ? name.substring(0, 20) + "..." : name}
      </span>
      <div className="flex bg-black justify-center w-12">
        <img src={Star} alt={"Star"} />
        <div>
          <Typography
            typographyType={TypographyType.FOOT_NOTE}
            className="text-white ml-0.5 mt-0.5"
          >
            {rating.toFixed(1)}
          </Typography>
        </div>
      </div>
    </div>
  );
};

const HeaderChildren = ({ ...props }: HeaderChildrenProps) => {
  const router = useRouter();
  const intl = useIntl();

  const handleOnClick = () => {
    router.back();
  };

  return (
    <div>
      <Button
        data-testid={`${pageName}-back-button`}
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
        title={intl.formatMessage({ id: `${pageName}.header.title` })}
        titleProps={{
          color: utils.colorSelector("P200"),
          className: "text-xl whitespace-pre-wrap !mt-4",
        }}
      />
      <AutoCompleteComponent
        onAddressSelection={props.onAddressSelection}
        inputComponent={(param = {}) => (
          <div className="flex w-full  rounded relative">
            <div className="z-10 flex justify-center items-center h-auto px-4 absolute top-0 left-0 bottom-0">
              <img src={SearchIcon} alt="SearchIcon" />
            </div>
            <StyledTextField
              placeholder={intl.formatMessage({
                id: `${pageName}.header.search.placeholder`,
              })}
              inputProps={{ "data-testid": `${pageName}-search-input` }}
              {...param}
            />
          </div>
        )}
      />
    </div>
  );
};

export default WorkshopSelection;
