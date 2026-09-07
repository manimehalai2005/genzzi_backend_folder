const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1';

export interface State {
  id: string;
  name: string;
  code?: string;
  countryId?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateStateDto {
  name: string;
  code?: string;
  countryId?: string;
}

export interface UpdateStateDto extends Partial<CreateStateDto> {
  status?: string;
}

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

export const stateApi = {
  // 1. Get All States (with Pagination support)
  async getAll(page = 1, limit = 10): Promise<StatesPaginatedResponse> {
    const res = await fetch(`${BASE_URL}/states?page=${page}&limit=${limit}`, {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch states');
    return res.json();
  },

  // 2. Get Single State by ID
  async getById(id: string): Promise<StateResponse> {
    const res = await fetch(`${BASE_URL}/states/${id}`, {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch state');
    return res.json();
  },

  // 3. Create New State
  async create(dto: CreateStateDto): Promise<StateResponse> {
    const res = await fetch(`${BASE_URL}/states`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dto),
    });
    if (!res.ok) throw new Error('Failed to create state');
    return res.json();
  },

  // 4. Update State by ID
 async update(id: string, dto: UpdateStateDto): Promise<StateResponse> {
    const res = await fetch(`${BASE_URL}/states/${id}`, {
      method: 'PATCH', // PUT-க்கு பதிலாக PATCH என மாற்றவும்
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dto),
    });
    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      throw new Error(errorData?.message || 'Failed to update state');
    }
    return res.json();
  },
  // 5. Delete State by ID
  async remove(id: string): Promise<StateResponse> {
    const res = await fetch(`${BASE_URL}/states/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete state');
    return res.json();
  },
};