import Section from "@/components/Section";
import Stack from "@mui/material/Stack";
import React, { useCallback, useEffect, useState } from "react";
import {
  Article,
  Button,
  utils,
  Typography,
  TypographyType,
} from "@albathanext/design-system";
import { useRouter } from "next/router";
import PageHeader from "@/components/PageHeader/PageHeader";
import BackArrow from "@/assets/arrow-back-icon.svg";
import { FormattedMessage } from "react-intl";
import { StyledSwitch } from "./StyledComponents";
import range from "lodash.range";
import moment from "moment";
import { LabelType } from "@/services/common";
import { WeekSlotSelectionWrapper } from "./WeekSelection";
import {
  MOCK_DATA_NEXT_DATE_LIMIT,
  mockedTimeSlots,
} from "@/containers/TimeSlotSelection/mockedData";
export const pageName = "timeslot.selection";

export interface TimeSlot {
  time: string;
  availability: boolean;
}

export interface DateTimeSlot {
  date: string;
  timings: TimeSlot[];
}

export interface SelectedDateTimeSlot {
  date: string;
  time: string;
}

export interface TimeSlotSelectionProps {
  en?: { labels: LabelType[] };
  ar?: { labels: LabelType[] };
}

const TimeSlotSelection = () => {
  const router = useRouter();
  const [monthChecked, setMonthChecked] = useState(false);
  const [initialDate] = useState(new Date());
  const [workshopServiceSlots, setWorkshopServiceSlots] = useState<
    DateTimeSlot[]
  >([]);

  const handleOnClickBack = () => {
    router.back();
  };

  const switchChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMonthChecked(event.target.checked);
  };

  const formatDate = (date: Date, step: number) =>
    moment(date).add(step, "day").format("L");

  const getWorkshopServiceSlots = useCallback(() => {
    const data = range(MOCK_DATA_NEXT_DATE_LIMIT).map((step): DateTimeSlot => {
      return {
        date: formatDate(initialDate, step),
        timings: mockedTimeSlots,
      };
    });
    setWorkshopServiceSlots(data);
  }, [initialDate]);

  useEffect(() => {
    getWorkshopServiceSlots();
  }, [getWorkshopServiceSlots]);

  const onDateTimeSlotSelectionHandler = (
    dateTimeSlot: SelectedDateTimeSlot
  ) => {
    console.log(dateTimeSlot);
  };

  return (
    <Section
      className={`flex flex-col  h-screen`}
      style={{
        backgroundColor: utils.colorSelector("C500"),
      }}
      data-testid={`${pageName}`}
    >
      <PageHeader>
        <div className="flex items-center justify-between">
          <Button
            data-testid={`${pageName}-back-button`}
            className={`min-w-[40px] min-h-[40px] w-[40px] h-[40px]`}
            style={{
              borderColor: "rgba(220, 220, 220, 0.2)",
              backgroundColor: utils.colorSelector("P700"),
            }}
            onClick={handleOnClickBack}
          >
            <img src={BackArrow} alt="BackArrow" />
          </Button>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography
              style={{
                color: !monthChecked
                  ? utils.colorSelector("c100")
                  : utils.colorSelector("c200"),
              }}
              typographyType={TypographyType.FOOT_NOTE}
            >
              <FormattedMessage id={`${pageName}.switch.week.label`} />
            </Typography>
            <StyledSwitch
              data-testid="weekmonthswitch"
              checked={monthChecked}
              inputProps={{ "aria-label": "WeekMonthSwitch", role: "checkbox" }}
              onChange={switchChangeHandler}
            />
            <Typography
              style={{
                color: monthChecked
                  ? utils.colorSelector("c100")
                  : utils.colorSelector("c200"),
              }}
              typographyType={TypographyType.FOOT_NOTE}
            >
              <FormattedMessage id={`${pageName}.switch.month.label`} />
            </Typography>
          </Stack>
        </div>

        <Article
          title={<FormattedMessage id={`${pageName}.header.title`} />}
          titleProps={{
            color: utils.colorSelector("P200"),
            className: "text-xl font-medium !mt-4 whitespace-pre-line",
          }}
        />
      </PageHeader>

      <div className="p-6">
        {!monthChecked && (
          <WeekSlotSelectionWrapper
            workshopServiceSlots={workshopServiceSlots}
            onDateTimeSlotSelection={onDateTimeSlotSelectionHandler}
          />
        )}
      </div>
    </Section>
  );
};

export default TimeSlotSelection;
