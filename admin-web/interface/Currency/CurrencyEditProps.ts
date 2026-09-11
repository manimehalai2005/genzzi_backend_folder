import { Currency } from "@/typess/Currency";

export interface CurrencyEditDialogProps {
  currency: Currency | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}