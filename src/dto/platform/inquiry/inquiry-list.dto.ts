import { BaseDto } from '@/core';
import { INQUIRY, OrderByValue, YN } from '@/common';
import { InquiryDto } from './inquiry.dto';

export class InquiryListDto extends BaseDto<InquiryListDto>
  implements Partial<InquiryDto> {
  title?: string;
  content?: string;
  companyUserName?: string;
  companyName?: string;
  inquiryType?: INQUIRY;
  isClosed?: YN;
  orderByNo?: OrderByValue;
}
