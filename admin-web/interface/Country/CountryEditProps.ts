import { Country } from "@/typess/Country";

export interface CountryEditDialogProps {
  country: Country | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}