// BASE_URL-ல் உள்ள /countries பகுதியை நீக்கவும்
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1';

export interface Country {
  id: string;
  name: string;
  iso2: string;
  iso3: string;
  phoneCode?: string;
  currencyCode?: string;
  emoji?: string;
  status?: string;
}

export interface CreateCountryDto {
  name: string;
  iso2: string;
  iso3: string;
  phoneCode?: string;
  currencyCode?: string;
  emoji?: string;
}

export interface UpdateCountryDto extends Partial<CreateCountryDto> {
  status?: string;
}

export const countryApi = {
  async getAll(page = 1, limit = 10) {
    const res = await fetch(`${BASE_URL}/countries?page=${page}&limit=${limit}`, {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch countries');
    return res.json();
  },

  async getById(id: string) {
    const res = await fetch(`${BASE_URL}/countries/${id}`, {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch country');
    return res.json();
  },

  async create(dto: CreateCountryDto) {
    const res = await fetch(`${BASE_URL}/countries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dto),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      throw new Error(errorData?.message || 'Failed to create country');
    }
    return res.json();
  },

  async update(id: string, dto: UpdateCountryDto) {
    const res = await fetch(`${BASE_URL}/countries/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dto),
    });
    if (!res.ok) throw new Error('Failed to update country');
    return res.json();
  },

  async remove(id: string) {
    const res = await fetch(`${BASE_URL}/countries/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete country');
    return res.json();
  },
};