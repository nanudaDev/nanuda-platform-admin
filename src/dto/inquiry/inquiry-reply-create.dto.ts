import { BaseDto } from '@/core';
import { InquiryDto } from '.';
import { YN } from '@/common';

export class InquiryReplyCreateDto extends BaseDto<InquiryReplyCreateDto>
  implements Partial<InquiryDto> {
  content?: string;
  isInquiryReply: YN.YES;
}
