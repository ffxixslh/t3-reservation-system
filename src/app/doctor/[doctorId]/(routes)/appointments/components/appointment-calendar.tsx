import { zhCN } from "date-fns/locale";

import { type TAppointment } from "~/types";
import { columns } from "./columns";

import { Calendar } from "~/components/ui/calendar";
import { DataTable } from "~/components/ui/data-table";

interface AppointmentCalendarProps {
  selectedDay: Date | undefined;
  selectedDateAppointments: TAppointment[];
  setSelectedDay: (day: Date | undefined) => void;
}

const AppointmentCalendar: React.FC<
  AppointmentCalendarProps
> = ({
  selectedDay,
  selectedDateAppointments,
  setSelectedDay,
}) => {
  return (
    <div className="flex justify-center gap-8">
      <Calendar
        mode="single"
        locale={zhCN}
        selected={selectedDay}
        onSelect={setSelectedDay}
      />
      <DataTable
        className="flex-1"
        columns={columns}
        data={selectedDateAppointments ?? []}
      />
    </div>
  );
};

export default AppointmentCalendar;
