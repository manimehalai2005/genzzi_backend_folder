const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/v1";

export interface SocialPlatform {
  id: string;
  name: string;
  code?: string;
  baseUrl?: string;
  icon?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateSocialPlatformDto {
  name: string;
  code?: string;
  baseUrl?: string;
  icon?: string;
}

export interface UpdateSocialPlatformDto
  extends Partial<CreateSocialPlatformDto> {
  status?: string;
}

export interface SocialPlatformResponse {
  success: boolean;
  message: string;
  data: SocialPlatform;
}

export interface SocialPlatformsPaginatedResponse {
  success: boolean;
  message: string;
  data: SocialPlatform[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const errorData = await res.json().catch(() => null);

    throw new Error(
      errorData?.message || `Request failed with status ${res.status}`
    );
  }

  return res.json();
}

export const socialPlatformApi = {
  // 1. Get all social platforms
  async getAll(
    page = 1,
    limit = 100
  ): Promise<SocialPlatformsPaginatedResponse> {
    const res = await fetch(
      `${BASE_URL}/social-platforms?page=${page}&limit=${limit}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    return handleResponse<SocialPlatformsPaginatedResponse>(res);
  },

  // 2. Get social platform by ID
  async getById(id: string): Promise<SocialPlatformResponse> {
    const res = await fetch(`${BASE_URL}/social-platforms/${id}`, {
      method: "GET",
      cache: "no-store",
    });

    return handleResponse<SocialPlatformResponse>(res);
  },

  // 3. Create social platform
  async create(
    dto: CreateSocialPlatformDto
  ): Promise<SocialPlatformResponse> {
    const res = await fetch(`${BASE_URL}/social-platforms`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dto),
    });

    return handleResponse<SocialPlatformResponse>(res);
  },

  // 4. Update social platform
  async update(
    id: string,
    dto: UpdateSocialPlatformDto
  ): Promise<SocialPlatformResponse> {
    const res = await fetch(`${BASE_URL}/social-platforms/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dto),
    });

    return handleResponse<SocialPlatformResponse>(res);
  },

  // 5. Delete social platform
  async remove(id: string): Promise<SocialPlatformResponse> {
    const res = await fetch(`${BASE_URL}/social-platforms/${id}`, {
      method: "DELETE",
    });

    return handleResponse<SocialPlatformResponse>(res);
  },
};