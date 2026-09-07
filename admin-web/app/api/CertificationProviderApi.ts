const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1';

export interface CertificationProvider {
  id: string;
  name: string;
  code?: string;
  website?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateCertificationProviderDto {
  name: string;
  code?: string;
  website?: string;
}

export interface UpdateCertificationProviderDto extends Partial<CreateCertificationProviderDto> {
  status?: string;
}

export interface CertificationProviderResponse {
  success: boolean;
  message: string;
  data: CertificationProvider;
}

export interface CertificationProvidersPaginatedResponse {
  success: boolean;
  message: string;
  data: CertificationProvider[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export const certificationProviderApi = {
  // 1. Get All Certification Providers
  async getAll(): Promise<CertificationProvidersPaginatedResponse> {
    const res = await fetch(`${BASE_URL}/certification-providers`, {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch certification providers');
    return res.json();
  },

  // 2. Get Single Certification Provider by ID
  async getById(id: string): Promise<CertificationProviderResponse> {
    const res = await fetch(`${BASE_URL}/certification-providers/${id}`, {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch certification provider');
    return res.json();
  },

  // 3. Create New Certification Provider
  async create(dto: CreateCertificationProviderDto): Promise<CertificationProviderResponse> {
    const res = await fetch(`${BASE_URL}/certification-providers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dto),
    });
    if (!res.ok) throw new Error('Failed to create certification provider');
    return res.json();
  },

  // 4. Update Certification Provider by ID
  async update(id: string, dto: UpdateCertificationProviderDto): Promise<CertificationProviderResponse> {
    const res = await fetch(`${BASE_URL}/certification-providers/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dto),
    });
    if (!res.ok) throw new Error('Failed to update certification provider');
    return res.json();
  },

  // 5. Delete Certification Provider by ID
  async remove(id: string): Promise<CertificationProviderResponse> {
    const res = await fetch(`${BASE_URL}/certification-providers/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete certification provider');
    return res.json();
  },
};