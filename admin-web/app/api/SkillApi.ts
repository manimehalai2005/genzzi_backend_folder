const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1';

export interface Skill {
  id: string;
  name: string;
  category?: string;
  description?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateSkillDto {
  name: string;
  category?: string;
  description?: string;
}

export interface UpdateSkillDto extends Partial<CreateSkillDto> {
  status?: string;
}

export interface SkillResponse {
  success: boolean;
  message: string;
  data: Skill;
}

export interface SkillsPaginatedResponse {
  success: boolean;
  message: string;
  data: Skill[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export const skillApi = {
  // 1. Get All Skills
  async getAll(): Promise<SkillsPaginatedResponse> {
    const res = await fetch(`${BASE_URL}/skills`, {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch skills');
    return res.json();
  },

  // 2. Get Single Skill by ID
  async getById(id: string): Promise<SkillResponse> {
    const res = await fetch(`${BASE_URL}/skills/${id}`, {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch skill');
    return res.json();
  },

  // 3. Create New Skill
  async create(dto: CreateSkillDto): Promise<SkillResponse> {
    const res = await fetch(`${BASE_URL}/skills`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dto),
    });
    if (!res.ok) throw new Error('Failed to create skill');
    return res.json();
  },

  // 4. Update Skill by ID
  async update(id: string, dto: UpdateSkillDto): Promise<SkillResponse> {
    const res = await fetch(`${BASE_URL}/skills/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dto),
    });
    if (!res.ok) throw new Error('Failed to update skill');
    return res.json();
  },

  // 5. Delete Skill by ID
  async remove(id: string): Promise<SkillResponse> {
    const res = await fetch(`${BASE_URL}/skills/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete skill');
    return res.json();
  },
};