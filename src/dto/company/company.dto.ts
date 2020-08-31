import { BaseDto } from '@/core';
import { APPROVAL_STATUS } from '@/services/shared';
import { CodeManagementDto } from '@/services/init/dto';
import { CompanyUserDto } from '../company-user';
import { CompanyDistrictDto } from '../company-district';
import { AdminDto } from '../admin';
import { FileAttachmentDto } from '../file-upload';

export class CompanyDto extends BaseDto<CompanyDto> {
  no: number;
  admin?: AdminDto;
  adminNo?: number;
  nameKr: string;
  nameEng?: string;
  ceoKr: string;
  ceoEng?: string;
  population?: string;
  businessNo?: string;
  address: string;
  website?: string;
  email: string;
  fax?: string;
  phone: string;
  managerNo?: number;
  companyStatus: APPROVAL_STATUS;
  companyUsers?: CompanyUserDto[];
  codeManagement?: CodeManagementDto[];
  companyDistricts?: CompanyDistrictDto[];
  logo?: FileAttachmentDto[];
}
