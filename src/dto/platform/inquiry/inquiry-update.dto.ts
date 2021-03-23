import { InquiryDto } from './inquiry.dto';
import { YN } from '@/common';
import { BaseDto } from '@/core';

export class InquiryUpdateDto extends BaseDto<InquiryUpdateDto>
  implements Partial<InquiryDto> {
  isClosed?: YN;
}
