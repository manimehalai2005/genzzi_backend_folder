export interface CreateLanguageDto {
  code: string;
  name: string;
  nativeName?: string;
}

export interface UpdateLanguageDto extends Partial<CreateLanguageDto> {
  status?: string;
}