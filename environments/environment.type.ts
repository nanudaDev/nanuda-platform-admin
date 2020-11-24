export class Environment {
  baseURL?: string;
  NODE_ENV?: EnvironmentType;
  production?: boolean;
  clientName?: string;
  productionTip?: boolean;
  s3BaseUrl: string;
  siteUrl?: string;
  homepageBaseUrl?: string;
  homepageSiteUrl?: string;
}

export enum EnvironmentType {
  development = 'development',
  staging = 'staging',
  production = 'production',
}
