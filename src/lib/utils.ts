import { type ClassValue, clsx } from "clsx";
import { format, type Locale } from "date-fns";
import { twMerge } from "tailwind-merge";
import { type TDoctor, type TUser } from "~/types";

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

export const roleFormatter = (role: TUser["role"]) => {
  switch (role) {
    case "PATIENT": {
      return "患者";
    }
    case "DOCTOR": {
      return "医生";
    }
    case "ADMIN": {
      return "管理员";
    }
  }
};

export const levelFormatter = (level: TDoctor["level"]) => {
  switch (level) {
    case "CHIEF": {
      return "主任医师";
    }
    case "ATTENDING": {
      return "主治医师";
    }
    case "RESIDENT": {
      return "住院医师";
    }
    case "INTERN": {
      return "实习医师";
    }
  }
};
