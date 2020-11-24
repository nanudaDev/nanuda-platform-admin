<template>
  <section>
    <SectionTitle title="시설 관리" divider></SectionTitle>
    <b-row align-v="start">
      <b-col lg="6" class="my-3">
        <BaseCard title="공통 시설" no-body>
          <template v-slot:head>
            <b-button
              variant="primary"
              v-b-modal.add_aminity
              @click="showCreateModal('COMMON_FACILITY')"
            >
              추가하기
            </b-button>
          </template>
          <table class="table">
            <colgroup>
              <col width="160" />
              <col width="auto" />
              <col width="auto" />
              <col width="160" />
            </colgroup>
            <thead>
              <tr>
                <th scope="col">이미지</th>
                <th scope="col">시설 코드</th>
                <th scope="col">시설 이름</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="amenity in amenityCommonList"
                :key="amenity.amenityName"
              >
                <td>
                  <template v-if="amenity.image && amenity.image.length > 0">
                    <img
                      :src="image.endpoint"
                      :alt="amenity.amenityName"
                      v-for="image in amenity.image"
                      :key="image.endpoint"
                      style="max-height:50px"
                    />
                  </template>
                </td>
                <td>{{ amenity.amenityCode }}</td>
                <td>{{ amenity.amenityName }}</td>
                <td>
                  <b-button
                    variant="outline-primary"
                    v-b-modal.update_aminity
                    @click="showUpdateModal(amenity)"
                  >
                    수정
                  </b-button>
                  <b-button
                    variant="outline-danger"
                    v-b-modal.delete_amenity
                    @click="showDeleteModal(amenity.no)"
                  >
                    삭제
                  </b-button>
                </td>
              </tr>
            </tbody>
          </table>
          <b-pagination
            v-model="paginationCommon.page"
            v-if="false"
            pills
            :total-rows="amenityCommonListCount"
            :per-page="paginationCommon.limit"
            @input="paginateCommon()"
            class="mt-4 justify-content-center"
          ></b-pagination>
        </BaseCard>
      </b-col>
      <b-col lg="6" class="my-3">
        <BaseCard title="주방 시설" no-body>
          <template v-slot:head>
            <b-button
              variant="primary"
              v-b-modal.add_aminity
              @click="showCreateModal('KITCHEN_FACILITY')"
            >
              추가하기
            </b-button>
          </template>
          <table class="table">
            <colgroup>
              <col width="160" />
              <col width="auto" />
              <col width="auto" />
              <col width="160" />
            </colgroup>
            <thead>
              <tr>
                <th scope="col">이미지</th>
                <th scope="col">시설 코드</th>
                <th scope="col">시설 이름</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="amenity in amenityKitchenList"
                :key="amenity.amenityName"
              >
                <td>
                  <template v-if="amenity.image && amenity.image.length > 0">
                    <img
                      :src="image.endpoint"
                      :alt="amenity.amenityName"
                      v-for="image in amenity.image"
                      :key="image.endpoint"
                      style="max-height:50px"
                    />
                  </template>
                </td>
                <td>{{ amenity.amenityCode }}</td>
                <td>{{ amenity.amenityName }}</td>
                <td>
                  <b-button
                    variant="outline-primary"
                    v-b-modal.update_aminity
                    @click="showUpdateModal(amenity)"
                  >
                    수정
                  </b-button>
                  <b-button
                    variant="outline-danger"
                    v-b-modal.delete_amenity
                    @click="showDeleteModal(amenity.no)"
                  >
                    삭제
                  </b-button>
                </td>
              </tr>
            </tbody>
          </table>
          <b-pagination
            v-model="paginationKitchen.page"
            v-if="false"
            pills
            :total-rows="amenityKitchenListCount"
            :per-page="paginationKitchen.limit"
            @input="paginateKitchen()"
            class="mt-4 justify-content-center"
          ></b-pagination>
        </BaseCard>
      </b-col>
    </b-row>
    <!-- 시설 추가하기 -->
    <b-modal
      id="add_aminity"
      title="시설 추가하기"
      @hide="clearOutCreateDto()"
      @cancel="clearOutCreateDto()"
      @ok="createAmenity()"
    >
      <b-form-row>
        <b-col cols="12" class="d-none">
          <b-form-group label-cols="3" label="시설 타입">
            <b-form-radio
              v-model="amenityCreateDto.amenityType"
              v-for="code in amenityCodeSelect"
              :key="code"
              :value="code"
              name="amenity_code"
              >{{ code | enumTransformer }}</b-form-radio
            >
          </b-form-group>
        </b-col>
        <b-col md="6">
          <b-form-group label="공간 유형">
            <b-form-radio
              v-model="amenityCreateDto.spaceTypeNo"
              v-for="type in spaceTypeSelect"
              :key="type"
              :value="type"
              name="space_type"
              >{{ type | spaceTypeTransformer }}</b-form-radio
            >
          </b-form-group>
        </b-col>
        <b-col md="6">
          <b-form-group label="이미지 (86 * 86)">
            <div class="text-center">
              <template
                v-if="attachments && attachments.length > 0 && imageChanged"
              >
                <div
                  v-for="image in attachments"
                  :key="image.endpoint"
                  class="mb-2"
                >
                  <b-img-lazy :src="image.endpoint" style="max-height:80px" />
                </div>
                <div class="text-center mb-4">
                  <b-button variant="danger" @click="removeImage()"
                    >이미지 제거</b-button
                  >
                </div>
              </template>
            </div>
            <div class="cutom-file">
              <b-form-file
                placeholder="파일 첨부"
                ref="fileInput"
                @input="upload($event)"
              ></b-form-file>
            </div>
          </b-form-group>
        </b-col>
        <b-col md="6">
          <b-form-group label="시설 코드">
            <b-form-input v-model="amenityCreateDto.amenityCode" />
          </b-form-group>
        </b-col>
        <b-col md="6">
          <b-form-group label="시설 이름">
            <b-form-input v-model="amenityCreateDto.amenityName" />
          </b-form-group>
        </b-col>
      </b-form-row>
    </b-modal>
    <!-- 시설 수정 하기 -->
    <b-modal
      id="update_aminity"
      title="시설 수정하기"
      @hide="clearOutUpdateDto(selectedAmenity)"
      @cancel="clearOutUpdateDto(selectedAmenity)"
      @ok="updateAmenity(selectedAmenity)"
    >
      <b-form-row>
        <b-col cols="12" class="d-none">
          <b-form-group label-cols="3" label="시설 타입">
            <b-form-radio
              v-model="amenityUpdateDto.amenityType"
              v-for="code in amenityCodeSelect"
              :key="code"
              :value="code"
              name="amenity_code"
              >{{ code | enumTransformer }}</b-form-radio
            >
          </b-form-group>
        </b-col>
        <b-col md="6">
          <b-form-group label="공간 유형">
            <b-form-radio
              v-model="amenityUpdateDto.spaceTypeNo"
              v-for="type in spaceTypeSelect"
              :key="type"
              :value="type"
              name="space_type"
              >{{ type | spaceTypeTransformer }}</b-form-radio
            >
          </b-form-group>
        </b-col>
        <b-col md="6">
          <b-form-group label="이미지 (86 * 86)">
            <div class="text-center">
              <template
                v-if="
                  amenityUpdateDto.image &&
                    amenityUpdateDto.image.length > 0 &&
                    !newImageChanged
                "
              >
                <div
                  v-for="image in amenityUpdateDto.image"
                  :key="image.endpoint"
                  class="mb-2"
                >
                  <b-img-lazy :src="image.endpoint" style="max-height:80px" />
                </div>
              </template>
              <template
                v-if="
                  newAttachments && newAttachments.length > 0 && newImageChanged
                "
              >
                <div
                  v-for="image in newAttachments"
                  :key="image.endpoint"
                  class="mb-2"
                >
                  <b-img-lazy :src="image.endpoint" style="max-height:80px" />
                </div>
                <div class="text-center mb-4">
                  <b-button variant="danger" @click="removeUpdateImage()"
                    >이미지 제거</b-button
                  >
                </div>
              </template>
            </div>
            <div class="cutom-file">
              <b-form-file
                placeholder="파일 첨부"
                ref="fileInputUpdate"
                @input="uploadUpdate($event)"
              ></b-form-file>
            </div>
          </b-form-group>
        </b-col>
        <b-col md="6">
          <b-form-group label="시설 코드">
            <b-form-input v-model="amenityUpdateDto.amenityCode" />
          </b-form-group>
        </b-col>
        <b-col md="6">
          <b-form-group label="시설 이름">
            <b-form-input v-model="amenityUpdateDto.amenityName" />
          </b-form-group>
        </b-col>
      </b-form-row>
    </b-modal>
    <!-- 시설 삭제 하기 -->
    <b-modal
      id="delete_amenity"
      title="시설 삭제"
      header-bg-variant="danger"
      header-text-variant="light"
      hide-footer
    >
      <div class="text-center">
        <p>
          <b>정말로 삭제하시겠습니까?</b>
        </p>
        <div class="mt-2 text-right">
          <b-button variant="danger" @click="deleteOne()">삭제</b-button>
        </div>
      </div>
    </b-modal>
  </section>
</template>
<script lang="ts">
import BaseComponent from '@/core/base.component';
import Component from 'vue-class-component';
import { AmenityDto, AmenityListDto } from '@/dto';
import { Pagination } from '@/common';
import {
  AMENITY,
  CONST_AMENITY,
  CONST_SPACE_TYPE,
  SPACE_TYPE,
} from '@/services/shared';

import AmenityService from '@/services/amenity.service';
import BaseCard from '../../_components/BaseCard.vue';
import { FileAttachmentDto } from '@/services/shared/file-upload';
import FileUploadService from '../../../services/shared/file-upload/file-upload.service';
import { UPLOAD_TYPE } from '../../../services/shared/file-upload/file-upload.service';
import { ATTACHMENT_REASON_TYPE } from '@/services/shared/file-upload';
import toast from '../../../../resources/assets/js/services/toast.js';

@Component({
  name: 'AmenityList',
  components: {
    BaseCard,
  },
})
export default class AmenityList extends BaseComponent {
  private amenityCommonList: AmenityDto[] = [];
  private amenityCommonListCount = null;
  private amenityKitchenList: AmenityDto[] = [];
  private amenityKitchenListCount = null;
  private amenitySearchDto = new AmenityListDto();
  private amenityCreateDto = new AmenityDto();
  private amenityCodeSelect: AMENITY[] = [...CONST_AMENITY];
  private paginationCommon = new Pagination();
  private paginationKitchen = new Pagination();
  private amenityUpdateDto = new AmenityDto();

  private selectedAmenity: AmenityDto = new AmenityDto();
  private selectedAmenityId = null;
  private spaceTypeSelect = [1, 2];

  private attachments: FileAttachmentDto[] = [];
  private imageChanged = false;
  private newAttachments: FileAttachmentDto[] = [];
  private newImageChanged = false;

  async upload(file: File) {
    if (file) {
      const attachments = await FileUploadService.upload(UPLOAD_TYPE.AMENITY, [
        file,
      ]);
      this.attachments = [];
      this.attachments.push(
        ...attachments.filter(
          fileUpload =>
            fileUpload.attachmentReasonType === ATTACHMENT_REASON_TYPE.SUCCESS,
        ),
      );
      this.imageChanged = true;
    }
  }

  removeImage() {
    this.attachments = [];
    this.$refs['fileInput'].reset();
    this.imageChanged = false;
  }

  async uploadUpdate(file: File) {
    if (file) {
      const attachments = await FileUploadService.upload(UPLOAD_TYPE.AMENITY, [
        file,
      ]);
      this.newAttachments = [];
      this.newAttachments.push(
        ...attachments.filter(
          fileUpload =>
            fileUpload.attachmentReasonType === ATTACHMENT_REASON_TYPE.SUCCESS,
        ),
      );
      this.newImageChanged = true;
    }
  }

  removeUpdateImage() {
    this.newAttachments = [];
    this.$refs['fileInputUpdate'].reset();
    this.newImageChanged = false;
  }

  search(isPagination?: boolean) {
    if (!isPagination) {
      this.paginationCommon.page = 1;
      this.paginationKitchen.page = 1;
    }
    this.paginationCommon.limit = null;
    this.paginationKitchen.limit = null;

    this.amenitySearchDto.amenityType = AMENITY.COMMON_FACILITY;
    AmenityService.findAll(
      this.amenitySearchDto,
      this.paginationCommon,
    ).subscribe(res => {
      this.amenityCommonList = res.data.items;
      this.amenityCommonListCount = res.data.totalCount;
    });

    this.amenitySearchDto.amenityType = AMENITY.KITCHEN_FACILITY;
    AmenityService.findAll(
      this.amenitySearchDto,
      this.paginationKitchen,
    ).subscribe(res => {
      this.amenityKitchenList = res.data.items;
      this.amenityKitchenListCount = res.data.totalCount;
    });
  }

  paginateCommon() {
    this.search(true);
  }

  paginateKitchen() {
    this.search(true);
  }

  // create amenity
  createAmenity() {
    if (this.attachments.length > 0) {
      this.amenityCreateDto.image = this.attachments;
      AmenityService.create(this.amenityCreateDto).subscribe(res => {
        if (res) {
          toast.success('추가완료');
          this.search();
        }
      });
    } else {
      toast.error('아이콘 이미지를 등록해주세요');
    }
  }

  showCreateModal(amenityType) {
    if (amenityType === 'COMMON_FACILITY') {
      this.amenityCreateDto.amenityType = AMENITY.COMMON_FACILITY;
    }

    if (amenityType === 'KITCHEN_FACILITY') {
      this.amenityCreateDto.amenityType = AMENITY.KITCHEN_FACILITY;
    }
    this.imageChanged = false;
  }

  clearOutCreateDto() {
    this.amenityCreateDto = new AmenityDto();
  }

  // update amentiy
  updateAmenity(amenityNo) {
    amenityNo = this.selectedAmenity.no;
    if (this.newAttachments.length > 0) {
      this.amenityUpdateDto.image = this.newAttachments;
    } else {
      delete this.amenityUpdateDto.image;
    }
    AmenityService.update(amenityNo, this.amenityUpdateDto).subscribe(res => {
      if (res) {
        toast.success('수정완료');
        this.search();
      }
    });
  }

  showUpdateModal(amenityDto) {
    this.amenityUpdateDto = amenityDto;
    this.selectedAmenity = amenityDto;
    this.newImageChanged = false;
  }

  showDeleteModal(amenityId) {
    this.selectedAmenityId = amenityId;
  }

  clearOutUpdateDto() {
    this.amenityUpdateDto = new AmenityDto();
  }

  // delete amentiy
  deleteOne() {
    const id = this.selectedAmenityId;
    AmenityService.deleteOne(id).subscribe(res => {
      if (res) {
        this.search();
        this.$bvModal.hide('delete_amenity');
        toast.success('삭제완료');
      }
    });
  }

  created() {
    this.search();
  }
}
</script>
