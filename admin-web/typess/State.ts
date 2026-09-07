
import { State } from "@/app/api/StatesApi";
export interface StateEditDialogProps {
  state: State | null;
  isOpen: boolean;
  onClose: () => void;
}
export interface StateTableProps {
  states: State[];
}