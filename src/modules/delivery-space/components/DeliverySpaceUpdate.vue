<template>
  <b-modal
    id="update_delivery_space"
    title="타입 수정"
    size="xl"
    scrollable
    ok-title="수정"
    cancel-title="취소"
    @hide="clearOutUpdateDto()"
    @cancel="clearOutUpdateDto()"
    @ok="updateDeliverySpace()"
  >
    <b-form-row>
      <b-col lg="9">
        <b-col lg="12" class="text-right mb-3">
          <b-row no-gutters align-h="end">
            <b-col cols="12" lg="4">
              <b-form-group
                label="오픈 예정 활성화"
                label-size="sm"
                label-text-align="right"
                label-cols="10"
              >
                <b-form-checkbox
                  switch
                  size="lg"
                  v-model="deliverySpaceUpdateDto.isOpenedYn"
                  :value="showYn[1]"
                  :unchecked-value="showYn[0]"
                  :disabled="disabledYn"
                ></b-form-checkbox>
              </b-form-group>
            </b-col>
            <b-col cols="12" lg="4">
              <b-form-group
                label="노출 활성화"
                label-size="sm"
                label-text-align="right"
                label-cols="10"
              >
                <b-form-checkbox
                  switch
                  size="lg"
                  v-model="deliverySpaceUpdateDto.delYn"
                  :value="delYn[1]"
                  :unchecked-value="delYn[0]"
                ></b-form-checkbox>
              </b-form-group>
            </b-col>
            <b-col cols="12" lg="4">
              <b-form-group
                label="업체 측 노출 활성화"
                label-size="sm"
                label-text-align="right"
                label-cols="10"
              >
                <b-form-checkbox
                  switch
                  size="lg"
                  v-model="deliverySpaceUpdateDto.showYn"
                  :value="showYn[0]"
                  :unchecked-value="showYn[1]"
                ></b-form-checkbox>
              </b-form-group>
            </b-col>
          </b-row>
        </b-col>
        <b-form-row>
          <b-col lg="6" class="mb-3">
            <label>
              타입명
              <span class="red-text">*</span>
            </label>
            <b-form-input
              type="text"
              v-model="deliverySpaceUpdateDto.typeName"
            ></b-form-input>
          </b-col>
          <b-col lg="6" class="mb-3">
            <label>건물명</label>
            <b-form-input
              type="text"
              v-model="deliverySpaceUpdateDto.buildingName"
            ></b-form-input>
          </b-col>
        </b-form-row>
        <b-form-row>
          <b-col lg="6" class="mb-3">
            <label>
              평수
              <span class="red-text">*</span>
            </label>
            <b-form-input
              type="text"
              v-model="deliverySpaceUpdateDto.size"
            ></b-form-input>
          </b-col>
          <b-col lg="6" class="mb-3">
            <label>
              공간 수
              <span class="red-text">*</span>
            </label>
            <b-form-input
              type="number"
              v-model="deliverySpaceUpdateDto.quantity"
              @change="getQuantity($event)"
            ></b-form-input>
          </b-col>
        </b-form-row>
        <b-form-row>
          <b-col lg="6" class="mb-3">
            <label>
              보증금 (만원 단위)
              <span class="red-text">*</span>
            </label>
            <b-form-input
              type="text"
              v-model="deliverySpaceUpdateDto.deposit"
            ></b-form-input>
          </b-col>
          <b-col lg="6" class="mb-3">
            <label>
              월 임대료 (만원 단위)
              <span class="red-text">*</span>
            </label>
            <b-form-input
              type="text"
              v-model="deliverySpaceUpdateDto.monthlyRentFee"
            ></b-form-input>
          </b-col>
        </b-form-row>
        <b-form-row>
          <b-col lg="6" class="mb-3">
            <label>
              월 관리비 (만원 단위)
              <span class="red-text">*</span>
            </label>
            <b-form-input
              type="text"
              v-model="deliverySpaceUpdateDto.monthlyUtilityFee"
            ></b-form-input>
          </b-col>
        </b-form-row>
        <b-col lg="12" class="mb-3">
          <label>공간 옵션</label>
          <b-form-checkbox-group
            id="update_delivery_space_options"
            v-model="deliverySpaceOptionIds"
            name="update_delivery_space_options"
          >
            <b-form-checkbox
              v-for="option in deliverySpaceOptionsList"
              :key="option.no"
              :value="option.no"
              @change="addDeliverySpaceOption(option.no)"
              >{{ option.deliverySpaceOptionName }}</b-form-checkbox
            >
          </b-form-checkbox-group>
        </b-col>
        <b-col lg="12" class="mb-3">
          <label>주방 시설</label>
          <b-form-checkbox-group
            id="update_kitchen_facility"
            v-model="amenityIds"
            name="update_kitchen_facility"
          >
            <b-form-checkbox
              v-for="amenity in amenityList"
              :key="amenity.no"
              :value="amenity.no"
              @change="addAmenity(amenity.no)"
              >{{ amenity.amenityName }}</b-form-checkbox
            >
          </b-form-checkbox-group>
        </b-col>
        <b-col lg="12" class="mb-3">
          <label>운영 가능 브랜드</label>
          <b-form-checkbox-group
            id="update_available_brand"
            v-model="brandIds"
            name="update_available_brand"
          >
            <b-form-checkbox
              v-for="brand in brandList"
              :key="brand.no"
              :value="brand.no"
              @change="addBrand(brand.no)"
              >{{ brand.nameKr }}</b-form-checkbox
            >
          </b-form-checkbox-group>
        </b-col>

        <b-col lg="12" class="mb-3">
          <label>공간 설명 글</label>
          <b-form-textarea
            style="height:100px;"
            v-model="deliverySpaceUpdateDto.desc"
          ></b-form-textarea>
        </b-col>
      </b-col>
      <b-col lg="3">
        <label for>이미지</label>
        <b-form-file
          placeholder="파일 선택"
          ref="fileInput"
          @input="upload($event)"
          required
          multiple
        ></b-form-file>
        <div v-if="!dataLoading">
          <b-form-row no-gutters class="attatchments-list mt-2">
            <draggable v-model="uploadImages" draggable=".item">
              <transition-group>
                <b-col
                  cols="12"
                  v-for="images in uploadImages"
                  :key="images.endpoint"
                  class="p-2 item"
                >
                  <div class="attatchments-list-item">
                    <b-img
                      :src="images.endpoint"
                      alt
                      style="max-width:100%"
                      class="border rounded"
                    />
                    <b-icon
                      icon="x-circle-fill"
                      variant="danger"
                      class="btn-delete-item"
                      @click="deleteOldImages(images, index)"
                    ></b-icon>
                  </div>
                </b-col>
              </transition-group>
            </draggable>
            <!-- <template v-if="uploadImages && uploadImages.length > 0">
              <b-col
                cols="2"
                v-for="(images, index) in uploadImages"
                :key="index"
                class="p-2"
              >
                <div class="attatchments-list-item">
                  <b-img
                    :src="images.endpoint"
                    alt
                    style="max-width:100%"
                    class="border rounded"
                  />
                  <b-icon
                    icon="x-circle-fill"
                    variant="danger"
                    class="btn-delete-item"
                    @click="deleteOldImages(images, index)"
                  ></b-icon>
                </div>
              </b-col>
            </template> -->
            <template v-if="newImages && newImages.length > 0">
              <b-col
                cols="12"
                v-for="images in newImages"
                :key="images.originFileName"
                class="p-2"
              >
                <div class="attatchments-list-item">
                  <b-img
                    :src="images.endpoint"
                    alt
                    style="max-width:100%"
                    class="border rounded"
                  />
                  <b-icon
                    icon="x-circle-fill"
                    variant="danger"
                    class="btn-delete-item"
                    @click="deleteNewImages(images, index)"
                  ></b-icon>
                </div>
              </b-col>
            </template>
          </b-form-row>
        </div>
        <div class="half-circle-spinner mt-5" v-if="dataLoading">
          <div class="circle circle-1"></div>
          <div class="circle circle-2"></div>
        </div>
      </b-col>
    </b-form-row>
  </b-modal>
</template>
<script lang="ts">
import BaseComponent from '@/core/base.component';
import Component from 'vue-class-component';
import toast from '../../../../resources/assets/js/services/toast.js';
import draggable from 'vuedraggable';
import {
  AmenityDto,
  BrandDto,
  DeliverySpaceDto,
  DeliverySpaceOptionDto,
  DeliverySpaceUpdateDto,
} from '../../../dto';

import {
  ATTACHMENT_REASON_TYPE,
  FileAttachmentDto,
} from '../../../services/shared/file-upload';
import AmenityService from '../../../services/amenity.service';
import BrandService from '../../../services/brand.service';
import DeliverySpaceService from '../../../services/delivery-space.service';
import FileUploadService from '../../../services/shared/file-upload/file-upload.service';
import { UPLOAD_TYPE } from '../../../services/shared/file-upload/file-upload.service';
import { YN, CONST_YN } from '@/common/interfaces';

@Component({
  name: 'DeliverySpaceUpdate',
  components: {
    draggable,
  },
})
export default class DeliverySpaceUpdate extends BaseComponent {
  private deliverySpaceDto = new DeliverySpaceDto();
  private deliverySpaceUpdateDto = new DeliverySpaceUpdateDto();
  private amenityList: AmenityDto[] = [];
  private amenityIds: number[] = [];
  private attachments: FileAttachmentDto[] = [];
  private brandList: BrandDto[] = [];
  private brandIds: number[] = [];
  private deliverySpaceOptionIds: number[] = [];
  private deliverySpaceOptionsList: DeliverySpaceOptionDto[] = [];
  private delYn: YN[] = [...CONST_YN];
  private showYn: YN[] = [...CONST_YN];
  private newImages: FileAttachmentDto[] = [];
  private uploadImages: FileAttachmentDto[] = [];
  private selectedImages = [];
  private changedImage = false;
  private dataLoading = false;
  private disabledYn = false;

  // get common facility list
  getSpaceOptions() {
    DeliverySpaceService.findSpaceOption().subscribe(res => {
      if (res) {
        this.deliverySpaceOptionsList = res.data;
      }
    });
  }

  // get kitchen facility list
  getAmenities() {
    AmenityService.findAmenities('kitchen-facility').subscribe(res => {
      if (res) {
        this.amenityList = res.data;
      }
    });
  }

  // add amenity array
  addAmenity(amenityId) {
    if (this.amenityIds.includes(parseInt(amenityId))) {
      const index = this.amenityIds.indexOf(parseInt(amenityId));
      if (index > -1) {
        this.amenityIds.splice(index, 1);
      }
    } else {
      this.amenityIds.unshift(parseInt(amenityId));
    }
  }

  // add delivery space option ids
  addDeliverySpaceOption(deliverySpaceOptionId) {
    if (this.deliverySpaceOptionIds.includes(parseInt(deliverySpaceOptionId))) {
      const index = this.deliverySpaceOptionIds.indexOf(
        parseInt(deliverySpaceOptionId),
      );
      if (index > -1) {
        this.deliverySpaceOptionIds.splice(index, 1);
      }
    } else {
      this.deliverySpaceOptionIds.unshift(parseInt(deliverySpaceOptionId));
    }
  }

  getQuantity(value) {
    if (value <= 0) {
      this.disabledYn = true;
      this.deliverySpaceUpdateDto.isOpenedYn = this.showYn[0];
    } else {
      this.disabledYn = false;
    }
  }

  // get brand
  getBrands() {
    BrandService.findForSelect().subscribe(res => {
      if (res) {
        this.brandList = res.data;
      }
    });
  }

  // add brand ids
  addBrand(brandId) {
    if (this.brandIds.includes(parseInt(brandId))) {
      const index = this.brandIds.indexOf(parseInt(brandId));
      if (index > -1) {
        this.brandIds.splice(index, 1);
      }
    } else {
      this.brandIds.unshift(parseInt(brandId));
    }
  }

  // find delivery space dto
  findDeliverySpaceDto(deliverySpace: DeliverySpaceDto) {
    this.deliverySpaceUpdateDto = deliverySpace;
    this.deliverySpaceUpdateDto.companyDistrictNo =
      deliverySpace.companyDistrictNo;

    this.amenityIds = deliverySpace.amenities.map(v => v.no);
    this.deliverySpaceOptionIds = deliverySpace.deliverySpaceOptions.map(
      v => v.no,
    );
    this.brandIds = deliverySpace.brands.map(v => v.no);

    this.selectedImages = deliverySpace.images;
    this.uploadImages = [...this.selectedImages];
  }

  // 이미지 업로드
  async upload(file: File[]) {
    this.dataLoading = true;
    const attachments = await FileUploadService.upload(
      UPLOAD_TYPE.DELIVERY_SPACE,
      file,
    );
    this.newImages = [];
    this.newImages.push(
      ...attachments.filter(
        fileUpload =>
          fileUpload.attachmentReasonType === ATTACHMENT_REASON_TYPE.SUCCESS,
      ),
    );

    this.dataLoading = false;
    this.changedImage = true;
  }

  // delete images
  deleteNewImages(image, index) {
    if (this.newImages.includes(image)) {
      index = this.newImages.indexOf(image);
      if (index > -1) {
        this.newImages.splice(index, 1);
      }
    }
  }

  deleteOldImages(image, index) {
    if (this.uploadImages.includes(image)) {
      index = this.uploadImages.indexOf(image);
      if (index > -1) {
        this.uploadImages.splice(index, 1);
      }
    }
  }

  // update delivery space dto
  updateDeliverySpace() {
    if (this.deliverySpaceOptionIds) {
      this.deliverySpaceUpdateDto.deliverySpaceOptionIds = this.deliverySpaceOptionIds;
    }
    if (this.amenityIds) {
      this.deliverySpaceUpdateDto.amenityIds = this.amenityIds;
    }

    if (this.brandIds) {
      this.deliverySpaceUpdateDto.brandIds = this.brandIds;
    }

    if (this.uploadImages && this.uploadImages.length > 0) {
      this.deliverySpaceUpdateDto.images = this.uploadImages;
      this.deliverySpaceUpdateDto.newImages = this.newImages;
    }
    if (
      this.uploadImages &&
      this.uploadImages.length < 1 &&
      this.newImages &&
      this.newImages.length > 0
    ) {
      this.deliverySpaceUpdateDto.images = [];
      this.deliverySpaceUpdateDto.newImages = this.newImages;
    }
    if (
      this.uploadImages &&
      this.uploadImages.length < 1 &&
      this.newImages &&
      this.newImages.length < 1
    ) {
      this.deliverySpaceUpdateDto.newImages = [];
      this.deliverySpaceUpdateDto.images = [];
    }

    if (
      this.uploadImages &&
      this.uploadImages.length === 0 &&
      this.newImages &&
      this.newImages.length > 0
    ) {
      this.deliverySpaceUpdateDto.images = this.newImages;
      this.deliverySpaceUpdateDto.newImages = [];
    }

    DeliverySpaceService.update(
      this.$route.params.id,
      this.deliverySpaceUpdateDto,
    ).subscribe(res => {
      if (res) {
        this.changedImage = false;
        this.$root.$emit('find_delivery_space');
        // DeliverySpaceService.findOne(this.$route.params.id).subscribe(res => {
        //   this.newImages = [];
        //   this.deliverySpaceUpdateDto = res.data;
        // });
        toast.success('수정완료');
      }
    });
  }

  // clear out delivery space update dto
  clearOutUpdateDto() {
    this.newImages = [];
    this.deliverySpaceUpdateDto = new DeliverySpaceUpdateDto();
  }

  created() {
    this.getAmenities();
    this.getSpaceOptions();
    this.getBrands();
  }

  mounted() {
    this.$root.$on('update_delivery_space', deliverySpaceDto => {
      this.findDeliverySpaceDto(deliverySpaceDto);
    });
  }
}
</script>
