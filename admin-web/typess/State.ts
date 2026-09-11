import { Country } from "./Country";



export type State  = {
  id: string;
  name: string;
  code?: string;
  countryId: string;
  country?: Country;
  createdAt?: string;
  updatedAt?: string;
  cities?: any[];
  universities?: any[];
  colleges?: any[];
}



