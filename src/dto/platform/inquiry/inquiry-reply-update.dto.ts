import { InquiryReplyCreateDto } from './inquiry-reply-create.dto';

export class InquiryReplyUpdateDto extends InquiryReplyCreateDto {
  content?: string;
}
