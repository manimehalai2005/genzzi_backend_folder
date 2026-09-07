const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1';

export interface CollegeDepartment {
  id: string;
  name: string;
  code?: string;
  collegeId?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateCollegeDepartmentDto {
  name: string;
  code?: string;
  collegeId?: string;
}

export interface UpdateCollegeDepartmentDto extends Partial<CreateCollegeDepartmentDto> {
  status?: string;
}

export interface CollegeDepartmentResponse {
  success: boolean;
  message: string;
  data: CollegeDepartment;
}

export interface CollegeDepartmentsPaginatedResponse {
  success: boolean;
  message: string;
  data: CollegeDepartment[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export const collegeDepartmentApi = {
  // 1. Get All College Departments
  async getAll(): Promise<CollegeDepartmentsPaginatedResponse> {
    const res = await fetch(`${BASE_URL}/college-departments`, {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch college departments');
    return res.json();
  },

  // 2. Get Single College Department by ID
  async getById(id: string): Promise<CollegeDepartmentResponse> {
    const res = await fetch(`${BASE_URL}/college-departments/${id}`, {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch college department');
    return res.json();
  },

  // 3. Create New College Department
  async create(dto: CreateCollegeDepartmentDto): Promise<CollegeDepartmentResponse> {
    const res = await fetch(`${BASE_URL}/college-departments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dto),
    });
    if (!res.ok) throw new Error('Failed to create college department');
    return res.json();
  },

  // 4. Update College Department by ID
  async update(id: string, dto: UpdateCollegeDepartmentDto): Promise<CollegeDepartmentResponse> {
    const res = await fetch(`${BASE_URL}/college-departments/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dto),
    });
    if (!res.ok) throw new Error('Failed to update college department');
    return res.json();
  },

  // 5. Delete College Department by ID
  async remove(id: string): Promise<CollegeDepartmentResponse> {
    const res = await fetch(`${BASE_URL}/college-departments/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete college department');
    return res.json();
  },
};