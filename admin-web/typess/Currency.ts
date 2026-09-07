export interface CurrencyEditDialogProps {
  currency: any | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
export  interface CurrencyTableProps {
  currencies: any[];
}