import { BaseDto } from '@/core';
import { APPROVAL_STATUS, COMPANY } from '@/services/shared';
import { FileAttachmentDto } from '@/services/shared/file-upload';
import { CompanyDto } from '.';

export class CompanyUpdateDto extends BaseDto<CompanyUpdateDto>
  implements Partial<CompanyDto> {
  nameKr?: string;
  nameEng?: string;
  ceoKr?: string;
  ceoEng?: string;
  website?: string;
  fax?: string;
  phone?: string;
  email?: string;
  address?: string;
  population?: string;
  businessNo?: string;
  companyType?: COMPANY;
  companyStatus?: APPROVAL_STATUS;
  managerNo?: number;
  logo?: FileAttachmentDto[];
}
