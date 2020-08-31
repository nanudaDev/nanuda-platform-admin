<template>
  <section>
    <SectionTitle title="시설 관리" divider></SectionTitle>
    <b-row>
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
              <col width="auto" />
              <col width="auto" />
              <col width="80" />
            </colgroup>
            <thead>
              <tr>
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
                  <!-- <b-button
                    variant="outline-danger"
                    v-b-modal.delete_amenity
                    @click="showDeleteModal(amenity)"
                  >
                    삭제
                  </b-button> -->
                </td>
              </tr>
            </tbody>
          </table>
          <b-pagination
            v-model="paginationCommon.page"
            v-if="amenityCommonListCount"
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
              <col width="auto" />
              <col width="auto" />
              <col width="80" />
            </colgroup>
            <thead>
              <tr>
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
                  <!-- <b-button
                    variant="outline-danger"
                    v-b-modal.delete_amenity
                    @click="showDeleteModal(amenity)"
                  >
                    삭제
                  </b-button> -->
                </td>
              </tr>
            </tbody>
          </table>
          <b-pagination
            v-model="paginationKitchen.page"
            v-if="amenityKitchenListCount"
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
      @ok="create()"
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
      @hide="clearOutUpdateDto()"
      @cancel="clearOutUpdateDto()"
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
          <b-button variant="danger" @click="deleteAmenity()">삭제</b-button>
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
import { AMENITY, CONST_AMENITY } from '@/services/shared';

import AmenityService from '@/services/amenity.service';
import BaseCard from '../../_components/BaseCard.vue';

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

  search(isPagination?: boolean) {
    if (!isPagination) {
      this.paginationCommon.page = 1;
      this.paginationKitchen.page = 1;
    }
    this.paginationCommon.limit = 10;
    this.paginationKitchen.limit = 10;

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
  create() {
    AmenityService.create(this.amenityCreateDto).subscribe(res => {
      if (res) {
        toast.success('추가완료');
        this.search();
      }
    });
  }

  showCreateModal(amenityType) {
    if (amenityType === 'COMMON_FACILITY') {
      this.amenityCreateDto.amenityType = AMENITY.COMMON_FACILITY;
    }

    if (amenityType === 'KITCHEN_FACILITY') {
      this.amenityCreateDto.amenityType = AMENITY.KITCHEN_FACILITY;
    }
  }

  clearOutCreateDto() {
    this.amenityCreateDto = new AmenityDto();
  }

  // update amentiy
  updateAmenity(amenityNo) {
    amenityNo = this.selectedAmenity.no;
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
    this.search();
  }

  clearOutUpdateDtoDto() {
    this.amenityUpdateDto = new AmenityDto();
  }

  // delete amentiy
  deleteAmenity() {
    console.log('delete');
  }

  created() {
    this.search();
  }
}
</script>
