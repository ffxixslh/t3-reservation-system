import { type ClassValue, clsx } from "clsx";
import { format, type Locale } from "date-fns";
import { twMerge } from "tailwind-merge";
import {
  type TAppointment,
  type TDoctor,
  type TUser,
} from "~/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const dateFormatter = (
  dateValue: Date | number,
  locale: Locale,
  formatTemplate = "yyyy年MM月dd日 HH时mm分",
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

export const statusFormatter = (
  status: TAppointment["status"],
) => {
  switch (status) {
    case "PENDING": {
      return "待处理";
    }
    case "CONFIRMED": {
      return "已确认";
    }
    case "CANCELED": {
      return "已取消";
    }
    case "COMPLETED": {
      return "已完成";
    }
  }
};

export const columnIdFormatter = (columnId: string) => {
  // make the switch below to a map
  const columnIdMap: Record<string, string> = {
    id: "ID",
    name: "名称",
    email: "邮箱",
    phone: "电话",
    department: "部门",
    role: "角色",
    level: "级别",
    appointment: "预约",
    medicalRecord: "病历",
    date: "日期",
    doctor: "医生",
    patient: "患者",
    texts: "文本记录",
    description: "描述",
    status: "预约状态",
    time: "预约时间",
    createdAt: "创建时间",
    updatedAt: "更新时间",
    actions: "操作",
  };

  return columnIdMap[columnId];
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
