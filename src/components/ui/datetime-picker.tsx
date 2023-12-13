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
import { cn } from "~/lib/utils";
import { type SelectSingleEventHandler } from "react-day-picker";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { zhCN } from "date-fns/locale";

interface DateTimePickerProps {
  disabled?: boolean;
  date: Date;
  setDate: (date: Date) => void;
}

export const selectTimeConstraint = {
  min: "09:00",
  max: "17:00",
} as const;

export const timeParser = (value: string) => {
  const hours = Number.parseInt(
    value.split(":")[0] ?? "00",
    10,
  );
  const minutes = Number.parseInt(
    value.split(":")[1] ?? "00",
    10,
  );
  return [hours, minutes] as const;
};

export const DatetimePicker: React.FC<
  DateTimePickerProps
> = ({ disabled, date, setDate }) => {
  const [selectedDateTime, setSelectedDateTime] =
    React.useState<DateTime>(DateTime.fromJSDate(date));

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
    setDate(modifiedDay.toJSDate());
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
    setDate(modifiedDay.toJSDate());
  };

  const footer = (
    <>
      <div className="px-4 pb-4 pt-0">
        <Label>{`时间`}</Label>
        <Input
          type="time"
          lang="zh-Hans"
          onChange={handleTimeChange}
          value={selectedDateTime.toFormat("HH:mm")}
          min={selectTimeConstraint.min}
          max={selectTimeConstraint.max}
        />
      </div>
      {!selectedDateTime && <p>{`请先选择一个日期。`}</p>}
    </>
  );

  return (
    <Popover>
      <PopoverTrigger asChild className="z-10">
        <Button
          disabled={disabled}
          variant={"outline"}
          className={cn(
            "justify-start text-left font-normal",
            !date && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? (
            selectedDateTime.toFormat("yyyy-MM-dd HH:mm:ss")
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
            date >
              new Date(
                new Date().setDate(
                  new Date().getDate() + 6,
                ),
              )
          }
        />
        {footer}
      </PopoverContent>
    </Popover>
  );
};
