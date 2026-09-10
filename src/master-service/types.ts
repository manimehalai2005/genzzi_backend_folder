// Enums

import { MasterStatus } from "./enum";


// Country Model
export interface Country {
  id: string;
  iso2: string;
  iso3: string;
  name: string;
  phoneCode: string | null;
  currencyCode: string | null;
  emoji: string | null;
  status: MasterStatus;
  createdAt: Date;
  states?: State[];
  universities?: University[];
  colleges?: College[];
}

// State Model
export interface State {
  id: string;
  countryId: string;
  country?: Country;
  name: string;
  code: string | null;
  createdAt: Date;
  cities?: City[];
  universities?: University[];
  colleges?: College[];
}

// City Model
export interface City {
  id: string;
  stateId: string;
  state?: State;
  name: string;
  createdAt: Date;
  universities?: University[];
  colleges?: College[];
}

// Language Model
export interface Language {
  id: string;
  code: string;
  name: string;
  nativeName: string | null;
  status: MasterStatus;
  createdAt: Date;
}

// Currency Model
export interface Currency {
  id: string;
  code: string;
  name: string;
  symbol: string | null;
  createdAt: Date;
}

// Timezone Model
export interface Timezone {
  id: string;
  name: string;
  utcOffset: string;
  createdAt: Date;
}

// Skill Model
export interface Skill {
  id: string;
  name: string;
  category: string | null;
  status: MasterStatus;
  createdAt: Date;
}

// Industry Model
export interface Industry {
  id: string;
  name: string;
  description: string | null;
  createdAt: Date;
}

// Degree Model
export interface Degree {
  id: string;
  name: string;
  level: string | null;
  createdAt: Date;
}

// University Model
export interface University {
  id: string;
  name: string;
  countryId: string | null;
  country?: Country | null;
  stateId: string | null;
  state?: State | null;
  cityId: string | null;
  city?: City | null;
  website: string | null;
  createdAt: Date;
}

// Certification Provider Model
export interface CertificationProvider {
  id: string;
  name: string;
  website: string | null;
  createdAt: Date;
}

// File Type Model
export interface FileType {
  id: string;
  extension: string;
  mimeType: string;
  category: string | null;
  createdAt: Date;
}

// Social Platform Model
export interface SocialPlatform {
  id: string;
  name: string;
  website: string | null;
  icon: string | null;
  createdAt: Date;
}

// College Model
export interface College {
  id: string;
  code: string | null;
  name: string;
  shortName: string | null;
  website: string | null;
  countryId: string | null;
  country?: Country | null;
  stateId: string | null;
  state?: State | null;
  cityId: string | null;
  city?: City | null;
  departments?: CollegeDepartment[];
  createdAt: Date;
  updatedAt: Date;
}

// Department Model
export interface Department {
  id: string;
  code: string | null;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  colleges?: CollegeDepartment[];
}

// College Department Junction Model
export interface CollegeDepartment {
  id: string;
  collegeId: string;
  college?: College;
  departmentId: string;
  department?: Department;
}