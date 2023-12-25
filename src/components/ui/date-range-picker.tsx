import * as React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { addDays } from "date-fns";
import { type DateRange } from "react-day-picker";

import { cn, dateFormatter } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { zhCN } from "date-fns/locale";

interface DatePickerWithRangeProps {
  className?: string;
  defaultDateRange: DateRange | undefined;
  setDefaultDateRange: (date: DateRange) => void;
}

export const DatePickerWithRange: React.FC<
  DatePickerWithRangeProps
> = ({
  className,
  defaultDateRange,
  setDefaultDateRange,
}) => {
  const [selectedDateRange, setSelectedDateRange] =
    React.useState<DateRange>(
      defaultDateRange ?? {
        from: new Date(),
        to: addDays(new Date(), 7),
      },
    );

  function handleSelect(
    range: DateRange | undefined,
    selectedDay: Date,
  ) {
    const resultRange = range ?? {
      from: selectedDay,
      to: selectedDay,
    };
    setSelectedDateRange(resultRange);
    setDefaultDateRange(resultRange);
  }

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "justify-start text-center font-normal",
              !selectedDateRange && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            <div className="flex-1">
              {selectedDateRange.from ? (
                selectedDateRange.to ? (
                  <span>
                    {dateFormatter(
                      selectedDateRange.from,
                      "yyyy年MM月dd日",
                    )}
                    {" - "}
                    {dateFormatter(
                      selectedDateRange.to,
                      "yyyy年MM月dd日",
                    )}
                  </span>
                ) : (
                  dateFormatter(
                    selectedDateRange.from,
                    "yyyy年MM月dd日",
                  )
                )
              ) : (
                <span>{"选择一个日期"}</span>
              )}
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-0"
          align="start"
        >
          <Calendar
            initialFocus
            mode="range"
            locale={zhCN}
            defaultMonth={selectedDateRange?.from}
            selected={selectedDateRange}
            onSelect={handleSelect}
            numberOfMonths={2}
            disabled={(date) =>
              date < new Date() ||
              date > addDays(new Date(), 7)
            }
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
