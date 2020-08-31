import { BaseDto } from '@/core';
import { INQUIRY, YN } from '@/common';
import { ADMIN_USER, COMPANY_USER, COMPANY } from '@/services/shared';
import { CodeManagementDto } from '@/services/init/dto';

export class InquiryDto extends BaseDto<InquiryDto> {
  no: number;
  adminNo: number;
  companyNo: number;
  companyUserNo: number;
  inquiryNo: number;
  isInquiryReply?: YN;
  inquiryType: INQUIRY;
  title?: string;
  content: string;
  isEdited?: YN;
  isClosed?: YN;
  admin?: ADMIN_USER;
  companyUser?: COMPANY_USER;
  company?: COMPANY;
  codeManagement?: CodeManagementDto;
}
