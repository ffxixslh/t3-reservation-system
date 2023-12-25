import * as React from "react";
import { DateTime } from "luxon";
import { Calendar as CalendarIcon } from "lucide-react";

import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { cn, timeParser } from "~/lib/utils";
import { type SelectSingleEventHandler } from "react-day-picker";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { zhCN } from "date-fns/locale";
import { addDays } from "date-fns";
import { selectTimeConstraintMap } from "~/constants/map";

interface DateTimePickerProps {
  disabled?: boolean;
  defaultDate: Date;
  setDefaultDate: (date: Date) => void;
}

export const DatetimePicker: React.FC<
  DateTimePickerProps
> = ({ disabled, defaultDate, setDefaultDate }) => {
  const [selectedDateTime, setSelectedDateTime] =
    React.useState<DateTime>(
      DateTime.fromJSDate(defaultDate),
    );

  const handleSelect: SelectSingleEventHandler = (
    day,
    selected,
  ) => {
    const selectedDay = DateTime.fromJSDate(selected);
    const modifiedDay = selectedDay.set({
      hour: selectedDateTime.hour,
      minute: selectedDateTime.minute,
    });

    setSelectedDateTime(modifiedDay);
    setDefaultDate(modifiedDay.toJSDate());
  };

  const handleTimeChange: React.ChangeEventHandler<
    HTMLInputElement
  > = (e) => {
    const { value } = e.target;
    const [hours, minutes] = timeParser(value);
    const modifiedDay = selectedDateTime.set({
      hour: hours,
      minute: minutes,
    });

    setSelectedDateTime(modifiedDay);
    setDefaultDate(modifiedDay.toJSDate());
  };

  return (
    <Popover>
      <PopoverTrigger asChild className="z-10">
        <Button
          disabled={disabled}
          variant={"outline"}
          className={cn(
            "justify-start text-left font-normal",
            !defaultDate && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {defaultDate ? (
            selectedDateTime.toFormat("yyyy-MM-dd HH:mm")
          ) : (
            <span>{"选择日期"}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={selectedDateTime.toJSDate()}
          onSelect={handleSelect}
          locale={zhCN}
          initialFocus
          disabled={(date) =>
            date < new Date() ||
            date > addDays(new Date(), 7)
          }
          footer={
            <>
              <Label>{`时间`}</Label>
              <Input
                type="time"
                onChange={handleTimeChange}
                value={selectedDateTime.toFormat("HH:mm")}
                min={selectTimeConstraintMap.MIN}
                max={selectTimeConstraintMap.MAX}
              />
              {!selectedDateTime && (
                <p>{`请先选择一个日期。`}</p>
              )}
            </>
          }
        />
      </PopoverContent>
    </Popover>
  );
};
