import packageInfo from '../package.json';
import { Environment, EnvironmentType } from './environment.type';

export const StagingEnvironment: Environment = {
  baseURL: 'https://platform-api-test.nanudakitchen.com/',
  NODE_ENV: EnvironmentType.staging,
  production: false,
  clientName: packageInfo.name,
  productionTip: false,
  s3BaseUrl: 'https://kr.object.ncloudstorage.com/staging-storage-nanuda',
  siteUrl: 'https://nanuda-platform-admin-test-nnh3.onrender.com/',
};
