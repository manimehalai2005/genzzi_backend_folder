 import { Country } from "@/app/api/CountryApi";
 
 
 
 export interface CountryEditDialogProps {
  country: Country | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
