export const roleMap: Record<string, string> = {
  PATIENT: "患者",
  DOCTOR: "医生",
  ADMIN: "管理员",
};

export const levelMap: Record<string, string> = {
  CHIEF: "主任医师",
  ATTENDING: "主治医师",
  RESIDENT: "住院医师",
  INTERN: "实习医师",
};

export const statusMap: Record<string, string> = {
  PENDING: "待处理",
  CONFIRMED: "已确认",
  CANCELED: "已取消",
  COMPLETED: "已完成",
};

export const columnIdMap: Record<string, string> = {
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
