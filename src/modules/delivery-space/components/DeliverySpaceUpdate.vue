<template>
  <b-modal
    id="update_delivery_space"
    title="타입 수정"
    size="xl"
    scrollable
    @hide="clearOutUpdateDto()"
    @cancel="clearOutUpdateDto()"
    @ok="updateDeliverySpace()"
  >
    <b-form-row>
      <b-col lg="12" class="text-right mb-3">
        <b-row no-gutters align-h="end">
          <b-form-group label="삭제 활성화" label-size="sm" label-text-align="right" label-cols="8">
            <b-form-checkbox
              switch
              size="lg"
              v-model="deliverySpaceUpdateDto.delYn"
              :value="delYn[0]"
              :unchecked-value="delYn[1]"
            ></b-form-checkbox>
          </b-form-group>
        </b-row>
      </b-col>
      <b-col lg="3" class="mb-3">
        <label>
          타입명
          <span class="red-text">*</span>
        </label>
        <b-form-input type="text" v-model="deliverySpaceUpdateDto.typeName"></b-form-input>
      </b-col>
      <b-col lg="3" class="mb-3">
        <label>건물명</label>
        <b-form-input type="text" v-model="deliverySpaceUpdateDto.buildingName"></b-form-input>
      </b-col>
      <b-col lg="3" class="mb-3">
        <label>
          평수
          <span class="red-text">*</span>
        </label>
        <b-form-input type="text" v-model="deliverySpaceUpdateDto.size"></b-form-input>
      </b-col>
      <b-col lg="3" class="mb-3">
        <label>
          공간 수
          <span class="red-text">*</span>
        </label>
        <b-form-input type="number" v-model="deliverySpaceUpdateDto.quantity"></b-form-input>
      </b-col>
      <b-col lg="3" class="mb-3">
        <label>
          보증금 (만원 단위)
          <span class="red-text">*</span>
        </label>
        <b-form-input type="text" v-model="deliverySpaceUpdateDto.deposit"></b-form-input>
      </b-col>
      <b-col lg="3" class="mb-3">
        <label>
          월 임대료 (만원 단위)
          <span class="red-text">*</span>
        </label>
        <b-form-input type="text" v-model="deliverySpaceUpdateDto.monthlyRentFee"></b-form-input>
      </b-col>

      <b-col lg="3" class="mb-3">
        <label>
          월 관리비 (만원 단위)
          <span class="red-text">*</span>
        </label>
        <b-form-input type="text" v-model="deliverySpaceUpdateDto.monthlyUtilityFee"></b-form-input>
      </b-col>
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
          >{{ option.deliverySpaceOptionName }}</b-form-checkbox>
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
          >{{ amenity.amenityName }}</b-form-checkbox>
        </b-form-checkbox-group>
      </b-col>
      <b-col lg="12" class="mb-3">
        <label>브랜드</label>
        <b-form-checkbox-group
          id="update_available_barnd"
          v-model="brandIds"
          name="update_available_barnd"
        >
          <b-form-checkbox
            v-for="brand in brandList"
            :key="brand.no"
            :value="brand.no"
            @change="addBrand(brand.no)"
          >{{ brand.nameKr }}</b-form-checkbox>
        </b-form-checkbox-group>
      </b-col>
      <b-col lg="12">
        <label for>이미지</label>
        <div class="custom-file">
          <input
            type="file"
            class="custom-file-input"
            id="customFileLang"
            lang="kr"
            v-on:change="upload($event.target.files)"
            multiple
          />
          <label class="custom-file-label" for="customFileLang">이미지 변경</label>
        </div>
        <div v-if="!dataLoading">
          <b-form-row no-gutters class="attatchments-list mt-2">
            <template v-if="uploadImages && uploadImages.length > 0">
              <b-col cols="2" v-for="(images, index) in uploadImages" :key="index" class="p-2">
                <div class="attatchments-list-item">
                  <b-img :src="images.endpoint" alt style="max-width:100%" class="border rounded" />
                  <b-icon
                    icon="x-circle-fill"
                    variant="danger"
                    class="btn-delete-item"
                    @click="deleteOldImages(images, index)"
                  ></b-icon>
                </div>
              </b-col>
            </template>
            <template v-if="newImages && newImages.length > 0">
              <b-col cols="2" v-for="images in newImages" :key="images.originFileName" class="p-2">
                <div class="attatchments-list-item">
                  <b-img :src="images.endpoint" alt style="max-width:100%" class="border rounded" />
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

  private newImages: FileAttachmentDto[] = [];
  private uploadImages: FileAttachmentDto[] = [];
  private selectedImages = [];

  private changedImage = false;
  private dataLoading = false;

  private delSpace = new DeliverySpaceDto();

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
  async upload(file: FileList) {
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
    // this.uploadImages = [...this.newImages];
    this.dataLoading = false;
    this.changedImage = true;
  }

  // TODO: 이미지 리스트 상 삭제 리팩토링 필요.. 음..
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
        console.log(index);
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

    DeliverySpaceService.update(
      this.$route.params.id,
      this.deliverySpaceUpdateDto,
    ).subscribe(res => {
      if (res) {
        this.changedImage = false;
        this.deliverySpaceUpdateDto = new DeliverySpaceUpdateDto();
        DeliverySpaceService.findOne(this.$route.params.id).subscribe(res => {
          this.newImages = [];
          this.deliverySpaceUpdateDto = res.data;
        });
        this.$root.$emit('find_delivery_space');
        toast.success('수정완료');
      }
    });
  }

  clearOutUpdateDto() {
    this.deliverySpaceUpdateDto = new DeliverySpaceUpdateDto();
    this.$root.$emit('clearout_updatedto');
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
