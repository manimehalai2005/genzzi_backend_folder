import { Timezone } from '@/typess/TimeZone';

export interface TimezoneTableProps {
  data: Timezone[];
  isLoading?: boolean;
  onEdit?: (timezone: Timezone) => void;
  onDelete?: (id: string) => void;
}