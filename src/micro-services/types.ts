import { MasterStatus } from "../generated/prisma/enums.js";

export type Country = {
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
};

export type State = {
    id: string;
    countryId: string;
    name: string;
    code: string | null;
    createdAt: Date;
    country?: Country;
    cities?: City[];
    universities?: University[];
    colleges?: College[];
};

export type City = {
    id: string;
    stateId: string;
    name: string;
    createdAt: Date;
    state?: State;
    universities?: University[];
    colleges?: College[];
};

export type Language = {
    id: string;
    code: string;
    name: string;
    nativeName: string | null;
    status: MasterStatus;
    createdAt: Date;
};

export type Currency = {
    id: string;
    code: string;
    name: string;
    symbol: string | null;
    createdAt: Date;
};

export type Timezone = {
    id: string;
    name: string;
    utcOffset: string;
    createdAt: Date;
};

export type Skill = {
    id: string;
    name: string;
    category: string | null;
    status: MasterStatus;
    createdAt: Date;
};

export type Industry = {
    id: string;
    name: string;
    description: string | null;
    createdAt: Date;
};

export type Degree = {
    id: string;
    name: string;
    level: string | null;
    createdAt: Date;
};

export type University = {
    id: string;
    name: string;
    countryId: string | null;
    stateId: string | null;
    cityId: string | null;
    website: string | null;
    createdAt: Date;
    country?: Country | null;
    state?: State | null;
    city?: City | null;
};

export type CertificationProvider = {
    id: string;
    name: string;
    website: string | null;
    createdAt: Date;
};

export type FileType = {
    id: string;
    extension: string;
    mimeType: string;
    category: string | null;
    createdAt: Date;
};

export type SocialPlatform = {
    id: string;
    name: string;
    website: string | null;
    icon: string | null;
    createdAt: Date;
};

export type College = {
    id: string;
    code: string | null;
    name: string;
    shortName: string | null;
    website: string | null;
    countryId: string | null;
    stateId: string | null;
    cityId: string | null;
    createdAt: Date;
    updatedAt: Date;
    country?: Country | null;
    state?: State | null;
    city?: City | null;
    departments?: CollegeDepartment[];
};

export type Department = {
    id: string;
    code: string | null;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    colleges?: CollegeDepartment[];
};

export type CollegeDepartment = {
    id: string;
    collegeId: string;
    departmentId: string;
    college?: College;
    department?: Department;
};