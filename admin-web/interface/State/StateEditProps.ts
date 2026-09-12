import { State } from "@/typess/State";

export interface StateEditDialogProps {
  
  state: State | null;
  isOpen: boolean;       // isOpen aaga match panna
  onClose: () => void;   // onClose function type-ah match panna
}