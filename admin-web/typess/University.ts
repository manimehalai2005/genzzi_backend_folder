import { City } from "./City";
import { Country } from "./Country";
import { State } from "./State";


export type  University  = {
  id: string;
  name: string;
  countryId?: string;
  country?: Country;
  stateId?: string;
  state?: State;
  cityId?: string;
  city?: City;
  website?: string;
}

