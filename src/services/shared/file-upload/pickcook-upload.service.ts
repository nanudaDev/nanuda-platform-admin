import { BaseService } from '@/core';
import {
  UploadOption,
  FileType,
  FileAccessType,
  ACL,
  MimeTypes,
  FileAttachmentDto,
  ATTACHMENT_REASON_TYPE,
} from '.';
import axios from 'axios';
import toast from '../../../../resources/assets/js/services/toast.js';
import {
  EnvironmentType,
  ProductionEnvironment,
  DevelopmentEnvironment,
  ApiUrlType,
} from '../../../../environments';

export enum PICKCOOK_UPLOAD_TYPE {
  LOCATION_ANALYSIS = 'location-analysis',
  RESOURCE = 'resource',
  POPUP = 'popup',
}

type UploadOptionConfig = {
  [key in PICKCOOK_UPLOAD_TYPE]: UploadOption;
};

// TODO: Image resize
class PickcookFileUploadService extends BaseService {
  private static UPLOAD_OPTIONS: UploadOptionConfig = {
    [PICKCOOK_UPLOAD_TYPE.POPUP]: {
      path: 'popup',
      sizeLimit: 1024 * 1024 * 10,
      fileType: FileType.IMAGE,
      mimeType: FileType.IMAGE,
      accessType: FileAccessType.PUBLIC,
      acl: ACL.PUBLIC,
    },
    [PICKCOOK_UPLOAD_TYPE.LOCATION_ANALYSIS]: {
      path: 'location-analysis',
      sizeLimit: 1024 * 1024 * 10,
      fileType: FileType.DOCUMENT,
      mimeType: FileType.IMAGE,
      accessType: FileAccessType.PUBLIC,
      acl: ACL.PUBLIC,
    },
    [PICKCOOK_UPLOAD_TYPE.RESOURCE]: {
      path: 'resource',
      sizeLimit: 1024 * 1024 * 10,
      fileType: FileType.DOCUMENT,
      mimeType: FileType.IMAGE,
      accessType: FileAccessType.PUBLIC,
      acl: ACL.PUBLIC,
    },
  };
  private readonly mimeTypes: MimeTypes = {
    [FileType.IMAGE]: ['image/gif', 'image/png', 'image/jpeg', 'image/jpg'],
    [FileType.DOCUMENT]: [
      'image/gif',
      'image/png',
      'image/jpeg',
      'image/jpg',
      'image/webp',
      'image/heic',
      'application/octet-stream',
      'application/vnd.ms-excel', // .xls
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
      'application/vnd.ms-powerpoint', // .ppt
      'application/vnd.openxmlformats-officedocument.presentationml.presentation', // .pptx
      'application/msword', // .doc
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
      'application/pdf', // .pdf
      'application/zip', // .zip
      'text/csv', // .csv
      'text/plain', // .txt
    ],
  };

  constructor() {
    super();
  }

  /**
   * upload type
   * @param uploadType
   * @param files
   */
  async upload(uploadType: PICKCOOK_UPLOAD_TYPE, files: FileList | File[]) {
    console.log(uploadType, files);
    const attachments: FileAttachmentDto[] = [];
    const uploadOption = PickcookFileUploadService.UPLOAD_OPTIONS[uploadType];
    const endpointUrl =
      process.env.NODE_ENV === EnvironmentType.production
        ? ProductionEnvironment.s3PickcookBaseUrl
        : DevelopmentEnvironment.s3PickcookBaseUrl;
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      console.log(uploadOption);
      if (file.size > uploadOption.sizeLimit) {
        attachments.push({
          attachmentReasonType: ATTACHMENT_REASON_TYPE.SIZE,
          originFilename: file.name,
          mimetype: file.type,
        });
        toast.error(
          `${uploadOption.sizeLimit / 1024 / 1024}MB까지 지원합니다.`,
          '용량 초과',
        );
        return;
      }
      if (!this.mimeTypes[uploadOption.mimeType].includes(file.type)) {
        attachments.push({
          attachmentReasonType: ATTACHMENT_REASON_TYPE.CONTENT_TYPE,
          originFilename: file.name,
          mimetype: file.type,
        });
        console.log('test');
        toast.error('지원하지 않는 파일 형식입니다.', '파일');
        return;
      }

      const presigned = await this.filePost(
        'file-upload/retrieve-s3-presigned',
        {
          uploadType,
          filename: file.name,
          mimetype: file.type,
        },
        ApiUrlType.PICKCOOK,
      );

      if (!presigned || !presigned.data.url) {
        attachments.push({
          attachmentReasonType: ATTACHMENT_REASON_TYPE.ETC,
          originFilename: file.name,
          mimetype: file.type,
        });
        return;
      }
      console.log(presigned.data);
      //   toPromise()
      await axios.put(presigned.data.url, file, {
        headers: {
          'Content-Type': file.type,
          // required for public read - 버킷 타입에 따라 public 또는 private
          'x-amz-acl': uploadOption.acl,
        },
      });

      attachments.push({
        attachmentReasonType: ATTACHMENT_REASON_TYPE.SUCCESS,
        originFilename: file.name,
        mimetype: file.type,
        source: presigned.data.source,
        key: presigned.data.key,
        endpoint: `${endpointUrl}/${presigned.data.source}`,
        uploadType,
      });
    }
    return attachments;
  }
}

export default new PickcookFileUploadService();
