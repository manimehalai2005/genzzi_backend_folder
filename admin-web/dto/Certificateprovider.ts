export interface CreateCertificationProviderDto {
  name: string;
  code?: string;
  website?: string;
}

export interface UpdateCertificationProviderDto extends Partial<CreateCertificationProviderDto> {
  status?: string;
}

