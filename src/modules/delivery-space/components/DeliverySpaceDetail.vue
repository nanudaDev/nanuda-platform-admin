<template>
  <section>
    <SectionTitle :title="`${deliverySpaceDto.typeName} - 타입 정보`" divider>
      <template v-slot:rightArea>
        <router-link class="btn btn-secondary" to="/company/delivery-space"
          >목록보기</router-link
        >
      </template>
    </SectionTitle>
    <div class="clearfix  mb-4">
      <b-button
        variant="outline-secondary"
        @click="findOne(prevNo)"
        v-if="prevNo"
        class="float-left"
      >
        <b-icon icon="arrow-left"></b-icon> 이전
      </b-button>
      <b-button
        variant="outline-secondary"
        @click="findOne(nextNo)"
        v-if="nextNo"
        class="float-right"
      >
        다음 <b-icon icon="arrow-right"></b-icon>
      </b-button>
    </div>
    <b-row>
      <b-col cols="12" md="4">
        <b-carousel
          v-if="deliverySpaceDto.images && deliverySpaceDto.images.length > 0"
          :interval="3000"
          controls
          indicators
          img-width="500"
          img-height="480"
        >
          <b-carousel-slide
            v-for="image in deliverySpaceDto.images"
            :key="image.originalFilename"
            :img-src="image.endpoint"
          ></b-carousel-slide>
        </b-carousel>
        <b-img-lazy
          v-else
          :src="require('@/assets/images/general/common/img_placeholder.jpg')"
          rounded
          style="max-width:100%"
        />
        <template
          v-if="
            deliverySpaceDto.nndOpRecord &&
              deliverySpaceDto.nndOpRecord.length > 0
          "
        >
          <div v-for="record in deliverySpaceDto.nndOpRecord" :key="record.no">
            <span>
              {{ record.started | dateTransformer }} ~
              {{ record.ended | dateTransformer }}
            </span>
            <template>
              <div
                v-for="brandRecord in record.nndBrandOpRecord"
                :key="brandRecord.no"
              >
                {{ brandRecord.brand.name }}
                | {{ brandRecord.isOperatedYn }}
              </div>
            </template>
          </div>
        </template>
      </b-col>
      <b-col cols="12" md="8">
        <div v-if="deliverySpaceDto && deliverySpaceDto.companyDistrict">
          <h4 v-if="deliverySpaceDto.typeName" class="mb-3">
            <span class="px-2 py-1 rounded bg-dark white-text">{{
              deliverySpaceDto.no
            }}</span>
            {{ deliverySpaceDto.typeName }}
            <b-badge
              variant="warning"
              v-if="deliverySpaceDto.isOperatedYn === 'Y'"
              class="mr-1"
              >직영점</b-badge
            >
            <b-badge
              variant="danger"
              v-if="deliverySpaceDto.isOpenedYn !== 'Y'"
              class="mr-1"
              >오픈 예정</b-badge
            >
          </h4>

          <ul class="u-list">
            <li v-if="deliverySpaceDto.companyDistrict.company.nameKr">
              업체명 :
              <router-link
                :to="{
                  name: 'CompanyDetail',
                  params: {
                    id: deliverySpaceDto.companyDistrict.company.no,
                  },
                }"
              >
                {{ deliverySpaceDto.companyDistrict.company.nameKr }}
              </router-link>
            </li>
            <li v-if="deliverySpaceDto.companyDistrict.nameKr">
              지점명 :
              <router-link
                :to="{
                  name: 'CompanyDistrictDetail',
                  params: {
                    id: deliverySpaceDto.companyDistrict.no,
                  },
                }"
              >
                {{ deliverySpaceDto.companyDistrict.nameKr }}
              </router-link>
            </li>
            <li v-if="deliverySpaceDto.companyDistrict.bCode">
              법정동 코드 : {{ deliverySpaceDto.companyDistrict.bCode }}
            </li>
            <li v-if="deliverySpaceDto.companyDistrict.hCode">
              행정동 코드 : {{ deliverySpaceDto.companyDistrict.hCode }}
            </li>
            <li v-if="deliverySpaceDto.companyDistrict.region1DepthName">
              주소 : {{ deliverySpaceDto.companyDistrict.region1DepthName }}
              {{ deliverySpaceDto.companyDistrict.region2DepthName }}
              {{ deliverySpaceDto.companyDistrict.region3DepthName }}
            </li>
            <li v-if="deliverySpaceDto.buildingName">
              건물명 : {{ deliverySpaceDto.buildingName }}
            </li>
            <li v-if="deliverySpaceDto.size">
              평수 : {{ deliverySpaceDto.size }} 평
            </li>
            <li v-if="deliverySpaceDto.deposit">
              보증금 : {{ deliverySpaceDto.deposit }} 만원
            </li>
            <li v-if="deliverySpaceDto.monthlyRentFee">
              월 임대료 : {{ deliverySpaceDto.monthlyRentFee }} 만원
            </li>
            <li v-if="deliverySpaceDto.monthlyUtilityFee">
              월 관리비 : {{ deliverySpaceDto.monthlyUtilityFee }} 만원
            </li>
            <li
              v-if="
                deliverySpaceDto.deliverySpaceOptions &&
                  deliverySpaceDto.deliverySpaceOptions.length > 0
              "
            >
              공간 옵션 :
              <b-badge
                variant="success"
                v-for="option in deliverySpaceDto.deliverySpaceOptions"
                :key="option.no"
                class="m-1"
                >{{ option.deliverySpaceOptionName }}</b-badge
              >
            </li>
            <li
              v-if="
                deliverySpaceDto.amenities &&
                  deliverySpaceDto.amenities.length > 0
              "
            >
              주방 시설 :
              <b-badge
                variant="info"
                v-for="amenity in deliverySpaceDto.amenities"
                :key="amenity.no"
                class="m-1"
                >{{ amenity.amenityName }}</b-badge
              >
            </li>
            <li v-if="deliverySpaceDto.desc">
              공간 설명: {{ deliverySpaceDto.desc }}
            </li>
            <li>
              노출 여부 :
              <b
                :class="
                  deliverySpaceDto.delYn === 'N'
                    ? 'text-success'
                    : 'text-danger'
                "
                >{{ deliverySpaceDto.delYn === 'N' ? 'O' : 'X' }}</b
              >
            </li>
            <li>
              업체 노출 여부 :
              <b
                :class="
                  deliverySpaceDto.showYn === 'Y'
                    ? 'text-success'
                    : 'text-danger'
                "
                >{{ deliverySpaceDto.showYn === 'Y' ? 'O' : 'X' }}</b
              >
            </li>
            <li v-if="deliverySpaceDto.isBested">
              추천 공유주방 :
              <b-badge
                :variant="
                  deliverySpaceDto.isBested.showYn === 'Y'
                    ? 'success'
                    : 'danger'
                "
                >{{ deliverySpaceDto.isBested.showYn }}</b-badge
              >
            </li>
          </ul>
          <div
            v-if="deliverySpaceDto.brands && deliverySpaceDto.brands.length > 0"
          >
            창업 가능 브랜드
            <div class="mt-2">
              <router-link
                :to="{
                  name: 'BrandDetail',
                  params: {
                    id: brand.no,
                  },
                }"
                v-for="brand in deliverySpaceDto.brands"
                :key="brand.logo[0].no"
                class="d-inline-block border m-1"
              >
                <b-img-lazy
                  :src="brand.logo[0].endpoint"
                  :alt="brand.logo[0].nameKr"
                  style="max-height:40px"
                ></b-img-lazy>
              </router-link>
            </div>
          </div>
          <div
            v-if="deliverySpaceDto.quantity"
            class="border bg-light rounded p-3 mt-3"
          >
            남은 공실 갯수 :
            <b
              :class="[
                deliverySpaceDto.remainingCount > 0
                  ? 'text-success'
                  : 'text-danger',
              ]"
              >{{ deliverySpaceDto.remainingCount }}</b
            >
            /
            {{ deliverySpaceDto.quantity }}
          </div>
        </div>
        <div class="text-right mt-4">
          <b-button
            variant="warning"
            v-b-modal.update_delivery_space_op_record
            @click="showUpdateOPRecordModal()"
          >
            <b-icon icon="flag-fill"></b-icon>
            직영점</b-button
          >
          <b-button
            variant="primary"
            v-b-modal.update_delivery_space
            @click="showUpdateModal()"
            >수정하기</b-button
          >
          <b-button
            variant="danger"
            v-b-modal.delete_delivery_space
            @click="showUpdateModal()"
            >영구 삭제하기</b-button
          >
        </div>
      </b-col>
      <b-col>
        <DeliverySpaceDetailContractList />
      </b-col>
    </b-row>
    <DeliverySpaceUpdate :deliverySpaceDto="deliverySpaceDto" />
    <!-- 공간 영구 삭제하기 -->
    <b-modal
      id="delete_delivery_space"
      title="지점 타입 삭제하기"
      header-bg-variant="danger"
      header-text-variant="light"
      hide-footer
    >
      <div class="text-center">
        <p>
          <b>정말로 삭제하시겠습니까?</b>
        </p>
        <div class="mt-3">
          <input
            type="text"
            placeholder="삭제하겠습니다 입력해주세요"
            name="delete_company"
            class="form-control"
            id="delete_company"
            v-model="deleteDeliverySpaceConfirm"
          />
        </div>
        <div class="mt-2 text-right">
          <b-button variant="danger" @click="deleteDeliverySpace()"
            >영구 삭제</b-button
          >
        </div>
      </div>
    </b-modal>
    <!-- 직영점 -->
    <b-modal id="update_delivery_space_op_record" title="직영점" hide-footer>
      <b-form-row>
        <b-col cols="12">
          <b-form-group label-cols="3" label="직영점 여부">
            <b-form-checkbox
              switch
              size="lg"
              v-model="deliverySpaceUpdateDto.isOperatedYn"
              :value="opYn[0]"
              :unchecked-value="opYn[1]"
            ></b-form-checkbox>
          </b-form-group>
        </b-col>
        <b-col cols="12" md="6">
          <b-form-group label="운영 시작 날짜">
            <b-form-datepicker
              id="started"
              v-model="deliverySpaceUpdateDto.operatingStartDate"
            ></b-form-datepicker>
          </b-form-group>
        </b-col>
        <b-col cols="12" md="6">
          <b-form-group label="운영 종료 날짜">
            <b-form-datepicker
              id="ended"
              v-model="deliverySpaceUpdateDto.operatingEndDate"
              :disabled="
                deliverySpaceUpdateDto.operatingStartDate ? false : true
              "
            ></b-form-datepicker>
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <label for="update_op_brand">운영 브랜드</label>
          <b-form-checkbox-group
            id="update_op_brand"
            v-model="deliverySpaceUpdateDto.deliverySpaceNndBrandOpRecords"
            name="update_op_brand"
          >
            <b-form-checkbox
              v-for="brand in brandList"
              :key="brand.no"
              :value="brand.no"
            >
              <b-card>
                <img
                  :src="brand.logo[0].endpoint"
                  :alt="brand.nameKr"
                  v-if="brand.logo && brand.logo[0]"
                  height="80"
                />
                <template #footer>
                  <b-form-radio-group
                    id="update_op_brand_yn"
                    v-model="deliverySpaceNndBrandOpRecordDto.isOperatedYn"
                  >
                    <b-form-radio v-for="yn in opYn" :key="yn" :value="yn">
                      {{ yn }}
                    </b-form-radio>
                  </b-form-radio-group>
                </template>
              </b-card>
            </b-form-checkbox>
          </b-form-checkbox-group>
        </b-col>
      </b-form-row>
      <div
        class="text-right"
        v-if="deliverySpaceUpdateDto.isOperatedYn === 'Y'"
      >
        <b-button variant="primary" @click="updateOPBrandRecord()">
          수정
        </b-button>
      </div>
    </b-modal>
  </section>
</template>
<script lang="ts">
import BaseCard from '../../_components/BaseCard.vue';
import BaseComponent from '@/core/base.component';
import { Prop, Vue, Component } from 'vue-property-decorator';
import {
  BrandDto,
  DeliverySpaceDto,
  DeliverySpaceListDto,
  DeliverySpaceUpdateDto,
} from '../../../dto';
import AmenityService from '../../../services/amenity.service';
import DeliverySpaceService from '../../../services/delivery-space.service';
import BrandService from '../../../services/brand.service';
import { CONST_YN, Pagination, YN } from '@/common';

import DeliverySpaceUpdate from './DeliverySpaceUpdate.vue';
import DeliverySpaceDetailContractList from './DeliverySpaceDetailContractList.vue';
import toast from '../../../../resources/assets/js/services/toast.js';
import {
  DeliverySpaceNndBrandOpRecordDto,
  DeliverySpaceNndOpRecordDto,
} from '@/dto';

@Component({
  name: 'DeliverySpaceDetail',
  components: {
    BaseCard,
    DeliverySpaceDetailContractList,
    DeliverySpaceUpdate,
  },
})
export default class DeliverySpaceList extends BaseComponent {
  private deliverySpaceDto = new DeliverySpaceDto();
  private deleteDeliverySpaceConfirm = null;
  private prevNo = null;
  private nextNo = null;

  private deliverySpaceUpdateDto = new DeliverySpaceDto();
  private deliverySpaceNndBrandOpRecordDto = new DeliverySpaceNndBrandOpRecordDto();
  private deliverySpaceNndOpRecordCreateDto = new DeliverySpaceNndOpRecordDto();
  private opYn: YN[] = [...CONST_YN];
  private brandList: BrandDto[] = [];
  private brandRecords: DeliverySpaceNndBrandOpRecordDto[] = [];

  // 타입 상세 보기
  findOne(id) {
    this.findOnePrevious(id);
    this.findOneNext(id);
    if (id !== this.$route.params.id) {
      this.$route.params.id = id;
      this.$router.push(`/company/delivery-space/${this.$route.params.id}`);
    }
    DeliverySpaceService.findOne(this.$route.params.id).subscribe(res => {
      if (res) {
        this.deliverySpaceDto = res.data;
        this.$root.$emit('find_contract_list', this.$route.params.id);
      }
    });
  }

  // 이전 타입 보기
  findOnePrevious(id) {
    DeliverySpaceService.findOnePrevious(id).subscribe(res => {
      if (res) {
        this.prevNo = res.data;
      }
    });
  }

  // 다음 타입 보기
  findOneNext(id) {
    DeliverySpaceService.findOneNext(id).subscribe(res => {
      if (res) {
        this.nextNo = res.data;
      }
    });
  }

  showUpdateModal() {
    this.$root.$emit('update_delivery_space', this.deliverySpaceDto);
    this.findOne(this.$route.params.id);
  }

  showUpdateOPRecordModal() {
    this.getNndBrand();
    this.deliverySpaceUpdateDto = this.deliverySpaceDto;
  }

  getNndBrand() {
    BrandService.findNanudaBrand().subscribe(res => {
      if (res) {
        this.brandList = res.data;
      }
    });
  }

  updateOPBrandRecord() {
    this.deliverySpaceUpdateDto.deliverySpaceNndBrandOpRecords.push(
      this.deliverySpaceNndBrandOpRecordDto,
    );
    DeliverySpaceService.update(
      this.$route.params.id,
      this.deliverySpaceUpdateDto,
    ).subscribe(res => {
      toast.success('수정완료');
      // this.findOne(this.$route.params.id);
    });
  }

  deleteDeliverySpace() {
    if (this.deleteDeliverySpaceConfirm === '삭제하겠습니다') {
      DeliverySpaceService.hardDelete(this.$route.params.id).subscribe(res => {
        if (res) {
          this.$router.push('/company/delivery-space');
          toast.success('삭제완료');
        }
      });
    } else {
      toast.error('삭제하겠습니다 입력해주세요');
    }
  }

  created() {
    this.findOne(this.$route.params.id);
  }

  mounted() {
    this.$root.$on('find_delivery_space', () => {
      this.findOne(this.$route.params.id);
    });
    this.$root.$on('delete_contract_list', () => {
      this.findOne(this.$route.params.id);
    });
  }
}
</script>
