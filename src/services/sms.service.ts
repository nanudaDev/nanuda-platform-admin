import { BaseService } from '@/core';
import { AdminSendMessageDto } from '@/dto';

class SmsService extends BaseService {
  constructor() {
    super();
  }

  sendMessage(adminSendMessageDto: AdminSendMessageDto) {
    console.log(adminSendMessageDto);
    return super.post<any>('admin/send-message', adminSendMessageDto);
  }
}

export default new SmsService();
