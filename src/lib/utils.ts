import { type ClassValue, clsx } from "clsx";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import { twMerge } from "tailwind-merge";
import {
  roleMap,
  levelMap,
  statusMap,
  columnIdMap,
} from "~/constants";
import {
  type TAppointment,
  type TDoctor,
  type TUserOrigin,
} from "~/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const currencyFormatter = new Intl.NumberFormat(
  "en-US",
  {
    style: "currency",
    currency: "USD",
  },
);

export const dateFormatter = (
  dateValue: Date | number,
  locale = zhCN,
  formatTemplate = "yyyy年MM月dd日 HH时mm分",
) => {
  return format(dateValue, formatTemplate, {
    locale,
  });
};

export const roleFormatter = (role: TUserOrigin["role"]) =>
  roleMap[role];

export const levelFormatter = (level: TDoctor["level"]) =>
  levelMap[level];

export const statusFormatter = (
  status: TAppointment["status"],
) => statusMap[status];

export const columnIdFormatter = (columnId: string) =>
  columnIdMap[columnId];

export const getKeyByValue = (
  searchKey: string,
  value: string,
) => {
  const record = getMapBySearchKey(searchKey);
  return Object.keys(record).find(
    (k) => record[k]?.includes(value),
  );
};

export const getMapBySearchKey = (key: string) => {
  const searchKeyMap: Record<
    string,
    Record<string, string>
  > = {
    role: roleMap,
    level: levelMap,
    status: statusMap,
  };
  return searchKeyMap[key] ?? {};
};

type RecordWithoutKey<
  R extends Record<string, unknown>,
  T extends keyof R | (keyof R)[],
> = R extends Record<infer K, unknown>
  ? T extends (keyof R)[]
    ? Pick<R, K extends T[number] ? never : K>
    : Pick<R, K extends T ? never : K>
  : R;

/**
 * Excludes a key or an array of keys from an object.
 *
 * @param {T} model - The object from which to exclude the key(s).
 * @param {K} key - The key(s) to exclude from the object.
 * @return {RecordWithoutKey<T, K>} - The object without the excluded key(s).
 */
export function excludeKeyFromObject<
  T extends Record<string, unknown>,
  K extends keyof T | (keyof T)[],
>(model: T, key: K): RecordWithoutKey<T, K> {
  return Object.fromEntries(
    Object.entries(model).filter(([k]) =>
      Array.isArray(key) ? !key.includes(k) : k !== key,
    ),
  ) as RecordWithoutKey<T, K>;
}
