import { type ClassValue, clsx } from "clsx";
import { format, type Locale } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const dateFormatter = (
  dateValue: Date,
  locale: Locale,
  formatTemplate = "yyyy-MM-dd HH:mm:ss",
) => {
  return format(dateValue, formatTemplate, {
    locale,
  });
};
