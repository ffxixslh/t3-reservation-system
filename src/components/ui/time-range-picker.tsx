import * as React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";

import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Label } from "./label";
import { Input } from "./input";
import { selectTimeConstraintMap } from "~/constants";

type TimeRange = {
  from: string;
  to?: string;
};

interface TimeRangePickerProps {
  className?: string;
  defaultTimeRange: string;
  setDefaultTimeRange: (time: string) => void;
}

export const TimeRangePicker: React.FC<
  TimeRangePickerProps
> = ({
  className,
  defaultTimeRange,
  setDefaultTimeRange,
}) => {
  const [selectedTimeRange, setSelectedTimeRange] =
    React.useState<TimeRange>(() => {
      const [start, end] = (
        defaultTimeRange ?? "08:30-17:30"
      ).split("-");
      return {
        from: start!,
        to: end,
      };
    });

  const handleTimeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    range: "from" | "to",
  ) => {
    const { value } = e.target;
    const modifiedTime = {
      ...selectedTimeRange,
      [range]: value,
    };
    const formattedTimeRange = `${modifiedTime.from}-${modifiedTime.to}`;

    setSelectedTimeRange(modifiedTime);
    setDefaultTimeRange(formattedTimeRange);
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "justify-start text-center font-normal",
              !selectedTimeRange && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            <div className="flex-1">
              {selectedTimeRange.from ? (
                selectedTimeRange.to ? (
                  <span>
                    {selectedTimeRange.from}
                    {" - "}
                    {selectedTimeRange.to}
                  </span>
                ) : (
                  selectedTimeRange.from
                )
              ) : (
                <span>{"选择一个时间"}</span>
              )}
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <div className="flex w-full flex-col gap-2 p-3">
            <Label>选择时间</Label>
            <div className="flex items-center gap-2">
              <Input
                id="date"
                type="time"
                onChange={(e) =>
                  handleTimeChange(e, "from")
                }
                value={selectedTimeRange?.from}
                min={selectTimeConstraintMap.MIN}
                max={selectTimeConstraintMap.MAX}
              />
              <span> - </span>
              <Input
                id="date"
                type="time"
                onChange={(e) => handleTimeChange(e, "to")}
                value={selectedTimeRange?.to}
                min={selectTimeConstraintMap.MIN}
                max={selectTimeConstraintMap.MAX}
              />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
