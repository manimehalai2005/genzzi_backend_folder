import { State } from "@/typess/State";

export interface StateTableProps {
  data: State[];
  isLoading?: boolean;
  onEdit: (state: State) => void;
  onDelete: (id: string) => void;
}