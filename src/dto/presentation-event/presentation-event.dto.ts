import { BaseDto } from '@/core';
import { CodeManagementDto } from '@/services/init/dto';
import {
  PRESENTATION_DISPLAY_TYPE,
  PRESENTATION_EVENT_TYPE,
} from '@/services/shared';
import { FileAttachmentDto } from '@/services/shared/file-upload';
import { AttendeesDto } from '../attendees';

export class PresentationEventDto extends BaseDto<PresentationEventDto> {
  no?: number;
  title?: string;
  desc?: string;
  displayType?: PRESENTATION_DISPLAY_TYPE;
  eventType?: PRESENTATION_EVENT_TYPE;
  eventTypeInfo?: CodeManagementDto;
  image?: FileAttachmentDto[];
  mobileImage?: FileAttachmentDto[];
  schedule?: string[];
  presentationDate?: Date;
  address?: string;
  lat?: string;
  lon?: string;
  contactPhone?: string;
  signedUpAttendees?: AttendeesDto[];
  posteventDesc?: string;
}
