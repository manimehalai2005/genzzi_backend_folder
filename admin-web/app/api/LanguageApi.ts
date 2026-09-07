const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1';

export interface Language {
  id?: string;
  code: string;
  name: string;
  nativeName?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateLanguageDto {
  code: string;
  name: string;
  nativeName?: string;
}

export interface UpdateLanguageDto extends Partial<CreateLanguageDto> {
  status?: string;
}

export interface LanguageResponse {
  success: boolean;
  message: string;
  data: Language;
}

export interface LanguagesPaginatedResponse {
  success: boolean;
  message: string;
  data: Language[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export const languageApi = {
  // 1. Get All Languages
  async getAll(): Promise<LanguagesPaginatedResponse> {
    const res = await fetch(`${BASE_URL}/languages`, {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch languages');
    return res.json();
  },

  // 2. Get Single Language by Code
  async getByCode(code: string): Promise<LanguageResponse> {
    const res = await fetch(`${BASE_URL}/languages/${code}`, {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch language');
    return res.json();
  },

  // 3. Create New Language
  async create(dto: CreateLanguageDto): Promise<LanguageResponse> {
    const res = await fetch(`${BASE_URL}/languages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dto),
    });
    if (!res.ok) throw new Error('Failed to create language');
    return res.json();
  },

  // 4. Update Language by Code
  async update(code: string, dto: UpdateLanguageDto): Promise<LanguageResponse> {
    const res = await fetch(`${BASE_URL}/languages/${code}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dto),
    });
    if (!res.ok) throw new Error('Failed to update language');
    return res.json();
  },

  // 5. Delete Language by Code
  async remove(code: string): Promise<LanguageResponse> {
    const res = await fetch(`${BASE_URL}/languages/${code}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete language');
    return res.json();
  },
};