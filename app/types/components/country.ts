export interface Country {
  label: string;
  value: string;
  cca2: string;
}

export interface CountryResponse {
  name: { common: string };
  cca2: string;
  idd?: {
    root?: string;
    suffixes?: string[];
  };
}
