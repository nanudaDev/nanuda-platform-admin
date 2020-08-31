import { BaseDto } from '@/core';
import { YN, OrderByValue } from '@/common';
import { InquiryListDto } from './inquiry-list.dto';

export class InquiryReplyListDto extends InquiryListDto {
  orderByNo?: OrderByValue;
}
