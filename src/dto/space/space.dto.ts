import { BaseDto } from '@/core';
import { YN } from '@/common';
import { SPACE } from '@/services/shared';
import { AdminDto } from '../admin';
import { NanudaUserDto } from '../nanuda-user';
import { AmenityDto } from '../amenity';
import { DeliverySpaceOptionDto } from '../delivery-space-option';

export class SpaceDto extends BaseDto<SpaceDto> {
  no: number;

  grade?: string;

  spaceScore?: string;

  analysisScore?: string;

  kbScore?: string;

  lSubPrimeYn?: YN;

  spaceTypeNo?: string;

  spaceInfo?: string;

  nanudaUserNo?: number;

  lat?: string;

  lon?: string;

  zoneCode?: string;

  address: string;

  detailAddress?: string;

  addressType?: string;

  userSelectedType?: string;

  bCode?: string;

  bName?: string;

  bName1?: string;

  bName2?: string;

  sido?: string;

  sigungu?: string;

  sigunguCode?: string;

  userLanguageType?: string;

  query?: string;

  buildingName?: string;

  buildingCode?: string;

  apartment?: string;

  jibunAddress?: string;

  jibunAddressEnglish?: string;

  roadAddress?: string;

  roadAddressEnglish?: string;

  autoRoadAddress?: string;

  autoRoadAddressEnglish?: string;

  autoJibunAddress?: string;

  autoJibunAddressEnglish?: string;

  noSelected?: string;

  hName?: string;

  roadNameCode?: string;

  roadName?: string;

  Yn: YN;

  delYn: YN;

  manager?: string;

  status: SPACE;

  name?: string;

  showName?: string;

  genResYn: YN;

  floor?: string;

  size?: string;

  bFireball?: string;

  sFireball?: string;

  deposit?: string;

  monthlyFee?: string;

  monthlyRent?: string;

  expiryDate?: Date;

  etc?: string;

  rentalType?: SPACE.TIME | SPACE.ALL | SPACE.KITCHEN;

  rentalDateType?: SPACE.WEEKDAY | SPACE.WEEKEND;

  rentalContent?: string;

  rentalHopeFee?: string;

  rentalStartDate?: Date;

  rentalEndDate?: Date;

  rentalExpYn: YN;

  analysisStatus: SPACE;

  rentalHopeEtc?: string;

  vicinityInfo?: JSON;

  //  TODO: create necessary DTOs for the following bottom:

  companyDistricts?: any[];

  deliverySpaceOptions?: DeliverySpaceOptionDto[];

  nanudaUser?: NanudaUserDto;

  admin?: AdminDto;

  amenities?: AmenityDto[];

  promotions?: any[];

  brands?: any[];
}
