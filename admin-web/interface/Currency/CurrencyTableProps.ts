import { Currency } from "@/typess/Currency";

export interface CurrencyTableProps {
  data: Currency[];
  isLoading?: boolean;
  onEdit?: (currency: Currency) => void;
  onDelete?: (id: string) => void;
}