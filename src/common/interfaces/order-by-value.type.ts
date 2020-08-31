import { EnumToArrayTransformer } from '@/core';

export enum OrderByValue {
  'ASC' = 'ASC',
  'DESC' = 'DESC',
}

// TODO: figure out how not to use Object.values
// EnumToArray does not seem to be working but the logic is soundbundleRenderer.renderToStream
export const CONST_OBJECT_BY_VALUE = Object.values(OrderByValue);
