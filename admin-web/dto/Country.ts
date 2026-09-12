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
