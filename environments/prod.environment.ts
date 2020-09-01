import packageInfo from '../package.json';
import { Environment, EnvironmentType } from './environment.type';

export const ProductionEnvironment: Environment = {
  baseURL: 'http://61.97.191.100:4200/',
  NODE_ENV: EnvironmentType.production,
  production: false,
  clientName: packageInfo.name,
  s3BaseUrl: 'https://kr.object.ncloudstorage.com/production-storage-nanuda',
};
