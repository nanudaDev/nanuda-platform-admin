export class Environment {
  baseURL?: string;
  NODE_ENV?: EnvironmentType;
  production?: boolean;
  clientName?: string;
  productionTip?: boolean;
  s3BaseUrl: string;
  s3PickcookBaseUrl?: string;
  siteUrl?: string;
  homepageBaseUrl?: string;
  homepageSiteUrl?: string;
  analysisUrl?: string;
  pickcookUrl?: string;
}

export enum EnvironmentType {
  development = 'development',
  staging = 'staging',
  production = 'production',
}

export enum ApiUrlType {
  PLATFORM = 'PLATFORM',
  ANALYSIS = 'ANALYSIS',
  PICKCOOK = 'PICKCOOK',
}
