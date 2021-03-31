import packageInfo from '../package.json';
import { Environment, EnvironmentType } from './environment.type';

export const DevelopmentEnvironment: Environment = {
  baseURL: 'http://localhost:4200/',
  NODE_ENV: EnvironmentType.development,
  production: false,
  clientName: packageInfo.name,
  productionTip: false,
  s3BaseUrl: 'https://kr.object.ncloudstorage.com/staging-storage-nanuda',
  siteUrl: 'http://localhost:4301/',
  homepageBaseUrl: 'http://localhost:8185',
  homepageSiteUrl: 'http://localhost:3000',
  analysisUrl: 'http://localhost:4400/',
  pickcookUrl: 'http://localhost:4700/',
};
