import { State } from "@/typess/State";

export interface StateResponse {
  success: boolean;
  message: string;
  data: State;
}

export interface StatesPaginatedResponse {
  success: boolean;
  message: string;
  data: State[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
