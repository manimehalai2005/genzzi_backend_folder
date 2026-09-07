import {Timezone} from "@/app/api/TimeZone";

export interface TimezoneEditDialogProps {
  timezone: Timezone | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
export interface TimezoneTableProps {
  timezones: Timezone[];
}