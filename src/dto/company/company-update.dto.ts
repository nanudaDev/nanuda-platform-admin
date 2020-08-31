import { BaseDto } from '@/core';
import { APPROVAL_STATUS } from '@/services/shared';
import { CompanyDto } from '.';
import { FileAttachmentDto } from '..';

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
  companyStatus?: APPROVAL_STATUS;
  managerNo?: number;
  logo?: FileAttachmentDto[];
}
