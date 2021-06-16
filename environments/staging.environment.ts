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
  homepageBaseUrl: 'http://211.249.62.165:8185/',
  homepageSiteUrl: 'http://211.249.62.165:3000/',
  analysisUrl: 'https://platform-analysis-test.nanudakitchen.com/',
  pickcookUrl: 'https://pickcook-api-test.nanudakitchen.com/',
};
