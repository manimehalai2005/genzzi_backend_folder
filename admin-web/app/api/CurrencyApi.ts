const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1';

export interface Currency {
  id: string;
  code: string;
  name: string;
  symbol: string;
  status?: string;
}

export interface CreateCurrencyDto {
  code: string;
  name: string;
  symbol: string;
}

export interface UpdateCurrencyDto extends Partial<CreateCurrencyDto> {
  status?: string;
}

export interface CurrencyResponse {
  success: boolean;
  message: string;
  data: Currency;
}

export interface CurrenciesPaginatedResponse {
  success: boolean;
  message: string;
  data: Currency[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export const currencyApi = {
  // 1. Get All Currencies
  async getAll(): Promise<CurrenciesPaginatedResponse> {
    const res = await fetch(`${BASE_URL}/currencies`, {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch currencies');
    return res.json();
  },

  // 2. Get Single Currency by Code
  async getByCode(code: string): Promise<CurrencyResponse> {
    const res = await fetch(`${BASE_URL}/currencies/${code}`, {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch currency');
    return res.json();
  },

  // 3. Create New Currency
  async create(dto: CreateCurrencyDto): Promise<CurrencyResponse> {
    const res = await fetch(`${BASE_URL}/currencies`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dto),
    });
    if (!res.ok) throw new Error('Failed to create currency');
    return res.json();
  },

  // 4. Update Currency by Code
  async update(code: string, dto: UpdateCurrencyDto): Promise<CurrencyResponse> {
    const res = await fetch(`${BASE_URL}/currencies/${code}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dto),
    });
    if (!res.ok) throw new Error('Failed to update currency');
    return res.json();
  },

  // 5. Delete Currency by Code
  async remove(code: string): Promise<CurrencyResponse> {
    const res = await fetch(`${BASE_URL}/currencies/${code}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete currency');
    return res.json();
  },
};