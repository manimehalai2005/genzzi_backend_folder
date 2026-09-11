import { City } from "@/typess/City";

export interface CityEditDialogProps {
  city: City | null;
  isOpen: boolean;
  onClose: () => void;
}