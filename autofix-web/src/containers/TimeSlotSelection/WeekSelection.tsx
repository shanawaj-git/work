import React from "react";
import { SelectedDateTimeSlot, TimeSlot, DateTimeSlot } from ".";
import { Button, Typography, TypographyType } from "@albathanext/design-system";
import moment from "moment";
export const DISPLAY_DATE_FORMAT = "dddd, MMM Do";
export const WeekSlotSelectionWrapper = ({
  workshopServiceSlots = [],
  onDateTimeSlotSelection,
}: {
  workshopServiceSlots: DateTimeSlot[];
  onDateTimeSlotSelection: (dateTimeSlot: SelectedDateTimeSlot) => void;
}) => {
  return (
    <>
      {workshopServiceSlots.map(({ date, timings }, index) => {
        return (
          <div
            key={`dayslot-wrapper-${index}`}
            data-testid={`dayslot-wrapper-${index}`}
          >
            <Typography
              className="font-semibold"
              typographyType={TypographyType.FOOT_NOTE}
              data-testid={`dayslot-${date}-label`}
            >
              {moment(date, "L").format(DISPLAY_DATE_FORMAT)}
            </Typography>
            <div
              className="flex w-full space-x-2 overflow-scroll scrollbar-hide"
              key={`dayslot-${date}-timeslots`}
            >
              {timings.map((slotObj: TimeSlot) => {
                return (
                  <Button
                    key={`dayslot-${date}-timeslot-${slotObj.time}`}
                    data-testid={`dayslot-${date}-timeslot-${slotObj.time}`}
                    disabled={!slotObj.availability}
                    className="!bg-white h-[42px] min-w-[98px] !border-gray-200 !border-[1px] rounded flex justify-center items-center my-[8px] cursor-pointer"
                    onClick={() =>
                      onDateTimeSlotSelection({
                        date: date,
                        time: slotObj.time,
                      })
                    }
                  >
                    <Typography
                      typographyType={TypographyType.FOOT_NOTE}
                      className="text-[15px] font-light"
                    >
                      {slotObj.time}
                    </Typography>
                  </Button>
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );
};
