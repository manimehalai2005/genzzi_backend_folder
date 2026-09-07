const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1';

export interface Department {
  id: string;
  name: string;
  code?: string;
  description?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateDepartmentDto {
  name: string;
  code?: string;
  description?: string;
}

export interface UpdateDepartmentDto extends Partial<CreateDepartmentDto> {
  status?: string;
}

export interface DepartmentResponse {
  success: boolean;
  message: string;
  data: Department;
}

export interface DepartmentsPaginatedResponse {
  success: boolean;
  message: string;
  data: Department[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export const departmentApi = {
  // 1. Get All Departments
  async getAll(): Promise<DepartmentsPaginatedResponse> {
    const res = await fetch(`${BASE_URL}/departments`, {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch departments');
    return res.json();
  },

  // 2. Get Single Department by ID
  async getById(id: string): Promise<DepartmentResponse> {
    const res = await fetch(`${BASE_URL}/departments/${id}`, {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch department');
    return res.json();
  },

  // 3. Create New Department
  async create(dto: CreateDepartmentDto): Promise<DepartmentResponse> {
    const res = await fetch(`${BASE_URL}/departments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dto),
    });
    if (!res.ok) throw new Error('Failed to create department');
    return res.json();
  },

  // 4. Update Department by ID
  async update(id: string, dto: UpdateDepartmentDto): Promise<DepartmentResponse> {
    const res = await fetch(`${BASE_URL}/departments/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dto),
    });
    if (!res.ok) throw new Error('Failed to update department');
    return res.json();
  },

  // 5. Delete Department by ID
  async remove(id: string): Promise<DepartmentResponse> {
    const res = await fetch(`${BASE_URL}/departments/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete department');
    return res.json();
  },
};