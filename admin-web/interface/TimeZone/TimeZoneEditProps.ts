import { Timezone } from "@/typess/TimeZone";

export interface TimezoneEditDialogProps {
  timezone: Timezone | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}