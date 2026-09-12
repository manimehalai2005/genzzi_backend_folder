export interface CreateCurrencyDto {
  code: string;
  name: string;
  symbol?: string;
}

export interface UpdateCurrencyDto extends Partial<CreateCurrencyDto> {
  status?: string;
}