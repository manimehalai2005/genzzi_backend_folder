
import { City } from "@/app/api/CityApi";

export interface CityEditDialogProps {
  city: City | null;
  isOpen: boolean;
  onClose: () => void;
}
export interface CityTableProps {
  cities: City[];
}